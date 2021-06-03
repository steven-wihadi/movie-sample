import './similar-movie.css';
import { getMovieDetail, getSimilarMovie } from "../../usecase/get-movie.usecase";
import { useEffect, useState } from "react";

export function SimilarMovie(props) {

  var page = 1;
  var isFetch = false;
  var isMaximum = false;

  const [ movieDetail, setMovieDetail ] = useState(undefined);
  const [ similarMovieList, setSimilarMovieList ] = useState([]);
  const movieId = props.match.params.movieId;

  const getDetailMovie = () => {
    getMovieDetail(movieId).then((res) => {
      setMovieDetail(res.data);
    });
  }

  const getMovieSimilar = () => {
    isFetch = true;
    getSimilarMovie(movieId, page).then((res) => {
      const list = res.data.results;
      setSimilarMovieList([...similarMovieList, ...list]);
      isMaximum = (res.data.page === res.data.total_pages) ? true : false;
      page += 1;
      isFetch = false;
    });
  }

  const onScroll = e => {
    if (e.target.scrollTop === e.target.scrollTopMax && !isFetch && !isMaximum) {
      getMovieSimilar();
    }
  };

  useEffect(() => {
    if (!movieDetail) { getDetailMovie(); }
    if (similarMovieList.length === 0) {
      page = 1;
      getMovieSimilar();
    }
  }, []);

  return <div className="similar-movie-wrapper" onScroll={onScroll}>
    { movieDetail && 
      <div className="content-wrapper">
        <div className="poster">
          <img src={ 'https://image.tmdb.org/t/p/w500' + movieDetail.backdrop_path } />
        </div>

        <div className="detail-movie">
          <h1 className="movie-title">{ movieDetail.title }</h1>
          <p className="movie-description">{ movieDetail.overview }</p>
          <span className="movie-release-date">{ movieDetail.release_date }</span>
        </div>

        <h2>Other suggestion movie</h2>
        <div className="similar-movie-area">
          { similarMovieList &&
            similarMovieList.map((movie) => 
              <div className="movie-card" key={ movie.id }>
                <a target='_blank' href={ '/similar/' + movie.id } className="poster">
                  <img src={ 'https://image.tmdb.org/t/p/w500' + movie.poster_path }/>
                </a>
                <span className="movie-title">{ movie.title }</span>
                <span className="release-date">{ movie.release_date }</span>
              </div>
            )
          }
        </div>
      </div>
    }
  </div>
}