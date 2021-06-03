import './App.css';
import { getMovieNowPlaying, getSimilarMovie } from "./usecase/get-movie.usecase";
import { Route } from "react-router-dom";
import { NowPlayingMovie } from "./pages/now-playing-movie/now-playing-movie";
import { SimilarMovie } from "./pages/similar-movie/similar-movie";
import { Header } from "./component/header/header";

export function App() {

  const click = () => {
    getMovieNowPlaying(1)
    .then((res) => { console.log('(OK): ', res); })
    .catch((err) => { console.log('(X): ', err); });
  }

  const click2 = () => {
    getSimilarMovie(18, 1)
    .then((res) => { console.log('(OK): ', res); })
    .catch((err) => { console.log('(X): ', err); });
  }

  return <div className="App">
    <Header></Header>
    {/* <button onClick={ () => click() }>Test</button>
    <button onClick={ () => click2() }>Test2</button> */}

    <Route exact path="/" component={ NowPlayingMovie }/>
    <Route exact path="/similar" component={ SimilarMovie }/>
  </div>
}
