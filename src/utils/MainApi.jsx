import { optionApi } from "./Constants";

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(res.status);
  };

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  //авторизация по токену
  setToken(jwt) {
    this._headers = {
      ...this._headers,
      authorization: `Bearer ${jwt}`,
    };
  }

  //получаем информацию о пользователи
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  //получаем список всех фильмов
  getMovies() {
    return this._request(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._headers,
    });
  }

  //сохранение данных профиля на сервере
  patchUserInfo(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        email: data.email,
        name: data.name,
      }),
    });
  }

  //добавляем фильм
  postAddMovie(data) {
    return this._request(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      }),
    });
  }

  //удаление фильма
  deleteMovie(movieId) {
    return this._request(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}

const mainApi = new MainApi(optionApi);
export default mainApi;
