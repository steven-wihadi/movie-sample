import './now-playing.css';
import { useEffect, useState } from "react";
import { getMovieNowPlaying } from "../../usecase/get-movie.usecase";

var page = 1;
var isFetch = false;
var isMaximum = false;

export function NowPlayingMovie() {

  const [ nowPlayingMovieList, setNowPlayingMovieList ] = useState([]);

  const fetchList = () => {
    isFetch = true;
    getMovieNowPlaying(page).then((res) => {
      const list = res.data.results;
      setNowPlayingMovieList([...nowPlayingMovieList, ...list]);
      isMaximum = (res.data.page === res.data.total_pages) ? true : false;
      page += 1;
      isFetch = false;
    });
  }

  const onScroll = e => {
    if (e.target.scrollTop === e.target.scrollTopMax && !isFetch && !isMaximum) {
      fetchList();
    }
  };

  useEffect(() => {
    if (nowPlayingMovieList.length == 0) {
      page = 1;
      fetchList();
    }
  }, []);

  return <div className="now-playing-movie-wrapper" onScroll={onScroll}>
    { nowPlayingMovieList &&
      nowPlayingMovieList.map((movie) => 
        <a className="movie-card" target='_blank' href={ '/similar/' + movie.id } key={ movie.id }>
          <div className="poster">
            <img src={ 'https://image.tmdb.org/t/p/w500' + movie.poster_path }/>
          </div>
          <span className="movie-title">{ movie.title }</span>
          <span className="release-date">{ movie.release_date }</span>
        </a>
      )
    }
  </div>
}