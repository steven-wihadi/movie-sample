import './App.css';
import { Route } from "react-router-dom";
import { NowPlayingMovie } from "./pages/now-playing-movie/now-playing-movie";
import { SimilarMovie } from "./pages/similar-movie/similar-movie";
import { Header } from "./component/header/header";

export function App() {
  return <div className="App">
    <Header></Header>

    <Route exact path="/" component={ NowPlayingMovie }/>
    <Route exact path="/similar/:movieId" component={ SimilarMovie }/>
  </div>
}
