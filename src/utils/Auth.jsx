// export const BaseUrl = 'https://api.movie.shtrihh.nomoredomainsmonster.ru';
export const BaseUrl = "http://localhost:3000";

const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(res.status);
};

//запрос для регистрации
export const register = (name, email, password) => {
  return fetch(`${BaseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  }).then(checkResponse);
};

//запрос для авторизации
export const authorize = (email, password) => {
  return fetch(`${BaseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email
    }),
  }).then(checkResponse);
};

export const tockenCheck = (jwt) => {
  return fetch(`${BaseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponse);
};
