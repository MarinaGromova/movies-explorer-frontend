const optionApi = {
  baseUrl: "http://localhost:3000",
  // baseUrl: 'https://api.movie.shtrihh.nomoredomainsmonster.ru',
  headers: {
    "Content-Type": "application/json",
  },
};

const optionMoviesApi = {
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json",
  },
};

const EMAIL_REGEX = "([^ ]+@[^ ]+.[a-z]{2,6}|)$";
const USER_NAME_REGEX = "^[A-Za-zА-Яа-яЁё\\-\\s]+$";

export const SCREEN_MOBILE = 380;
export const SCREEN_MEDIUM = 768;
export const SCREEN_DESKTOP = 1213;

export const MOVIES_COUNT_SCREEN_DESKTOP = 12;
export const MOVIES_COUNT_SCREEN_MEDIUM = 8;
export const MOVIES_COUNT_SCREEN_MOBILE = 5;

export const MORE_MOVIES_COUNT_SCREEN_DESKTOP = 3;
export const MORE_MOVIES_COUNT_SCREEN_MEDIUM = 2;
export const MORE_MOVIES_COUNT_SCREEN_MOBILE = 2;

export { optionApi, optionMoviesApi, EMAIL_REGEX, USER_NAME_REGEX };
