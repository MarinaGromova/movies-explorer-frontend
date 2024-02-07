import { optionMoviesApi } from "./Constants";

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  _request(baseUrl, options) {
    return fetch(baseUrl, options).then(this._checkResponse);
  }

  getMovies() {
    return this._request(`${this._baseUrl}`, {
      method: "GET",
      headers: this._headers,
    })
  }
}

const moviesApi = new MoviesApi(optionMoviesApi);
export default moviesApi;
