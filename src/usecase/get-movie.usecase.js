import { api_key } from '../environment';
import { axiosGet } from "../services/axios.adapter";

export function getMovieNowPlaying(page) {
  const link = 'https://api.themoviedb.org/3/movie/now_playing';
  const params = { api_key, page };
  return axiosGet(link, params);
}

export function getMovieDetail(movieId) {
  const link = `https://api.themoviedb.org/3/movie/${movieId}`;
  const params = { api_key };
  return axiosGet(link, params);
}

export function getSimilarMovie(movieId, page) {
  const link = `https://api.themoviedb.org/3/movie/${movieId}/similar`;
  const params = { api_key, page };
  return axiosGet(link, params);
} 