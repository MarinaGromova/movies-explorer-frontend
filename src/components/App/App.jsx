import "./App.css";
import React, { useEffect, useState, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Menu from "../Menu/Menu";
import Movies from "../Movies/Movies";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import { register, authorize, tockenCheck } from "../../utils/Auth";
import Footer from "../Footer/Footer";
import { moviesArray } from "../../utils/MoviesArray";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false); //состояние авторизации
  const [isOpenButtonMenu, setOpenButtonMenu] = useState(false); //состояние меню с 768px (открытие/закрытие)
  const [currentUser, setCurrentUser] = useState({}); //изменение данных пользователя
  const [isInfoTooltip, setInfoTooltip] = useState(false); //состояние попапа (открыт/закрыт)
  const [errorMessage, setErrorMessage] = useState(""); //сообщения об ошибке (в span)
  const [message, setMessage] = useState(false); //показывать или нет сообщение в попапе
  const [succesInfoToolTip, setSuccesInfoToolTip] = useState(""); //текст в попапе
  const [searchText, setSearchText] = useState(""); //состояние текста поиска
  const [savedMovies, setSavedMovies] = useState([]); //сохраненные фильм
  const [moviesList, setMoviesList] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const cleanErrorMessage = useCallback(() => {
    setErrorMessage("");
  }, [setErrorMessage]);

  useEffect(() => {
    cleanErrorMessage();
  }, [cleanErrorMessage, navigate]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), mainApi.getMovies()])
        .then(([user, movies]) => {
          setCurrentUser(user);
          setSavedMovies(movies);
          setLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    searchMovie();
  }, []);

  const onCheckToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      tockenCheck(token)
        .then((res) => {
          mainApi.setToken(token);
          setCurrentUser({ name: res.name, email: res.email, _id: res._id });
          setLoggedIn(true);
          if (location.pathname !== "/") {
            const lastPath = location.pathname;
            navigate(lastPath, { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    onCheckToken();
  }, []);

  //регистрация
  const hadleRegister = ({ name, email, password }) => {
    register(name, email, password)
      .then((res) => {
        setInfoTooltip(true);
        if (res) {
          setMessage(true);
          setSuccesInfoToolTip("Вы успешно зарегестрировались!");
          handleLogin({ email, password });
        }
      })
      .catch((err) => {
        setMessage(false);
        setInfoTooltip(true);
        if (err === 409) {
          setErrorMessage("Пользователь с таким email уже существует.");
        } else {
          setErrorMessage("При регистрации пользователя произошла ошибка.");
        }
      });
  };

  //авторизация
  const handleLogin = ({ email, password }) => {
    authorize(email, password)
      .then((res) => {
        if (res) {
          mainApi.setToken(res.token);
          setLoggedIn(true);
          setCurrentUser({ name: res.name, email: res.email });
          localStorage.setItem("token", res.token);
          navigate("/movies", { replace: true });
        }
      })
      .catch((err) => {
        setMessage(false);
        setInfoTooltip(true);
        if (err === 401) {
          setErrorMessage("Неверный логин или пароль.");
        } else if (err === 400) {
          setErrorMessage("При авторизации произошла ошибка.");
        } else {
          setErrorMessage("При авторизации произошла ошибка.");
        }
      });
  };

  //обновление данных на вкладке профиль
  const handleUpdateUserInfo = (data) => {
    mainApi
      .patchUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        if (newUser) {
          setInfoTooltip(true);
          setMessage(true);
          setSuccesInfoToolTip("Вы успешно обновили данные!");
        }
      })
      .catch((err) => {
        setMessage(false);
        setInfoTooltip(true);
        if (err === 409) {
          setErrorMessage("Пользователь с таким email уже существует.");
        } else {
          setErrorMessage("При обновлении пользователя произошла ошибка.");
        }
      });
  };

  //удаление данных из localStorage
  const onSignOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    setCurrentUser({
      name: "",
      email: "",
      _id: "",
    });
    navigate("/", { replace: true });
  };

  //загрузка фильмов по поиску
  const searchMovie = () => {
    if (localStorage.getItem("moviesList")) {
      setMoviesList(JSON.parse(localStorage.getItem("moviesList")));
    } else {
      moviesApi
        .getMovies()
        .then((res) => {
          const resultMovies = moviesArray(res);
          localStorage.setItem("movies", JSON.stringify(res));
          setMoviesList(resultMovies);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("moviesList");
          setMoviesList([]);
          setInfoTooltip(true);
          setSuccesInfoToolTip(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
        });
    }
  };

  //сохраняем фильм
  const handleSaveMovie = (data) => {
    mainApi
      .postAddMovie(data)
      .then((savedMovie) => {
        setSavedMovies([savedMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //удаляем фильм
  const handleDeleteMovie = (movieId) => {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        setSavedMovies(savedMovies.filter((movie) => movie._id !== movieId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //функция открытия меню
  const handleClickMenu = () => {
    setOpenButtonMenu(true);
  };

  //функция закрытия попапов
  const closeAllPopup = () => {
    setOpenButtonMenu(false);
    setInfoTooltip(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header loggedIn={loggedIn} openButtonMenu={handleClickMenu} />
                <Main />
                <Footer />
              </>
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <ProtectedRouteElement
                  component={Header}
                  loggedIn={loggedIn}
                  openButtonMenu={handleClickMenu}
                  classnames="header__dark"
                  navigationIcon="navigation__link-dark"
                />
                <ProtectedRouteElement
                  component={Movies}
                  loggedIn={loggedIn}
                  moviesList={moviesList}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  onSearch={searchMovie}
                  savedMovies={savedMovies}
                  onSaveCard={handleSaveMovie}
                  onDeleteCard={handleDeleteMovie}
                />
                <ProtectedRouteElement component={Footer} loggedIn={loggedIn} />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <ProtectedRouteElement
                  component={Header}
                  loggedIn={loggedIn}
                  openButtonMenu={handleClickMenu}
                  classnames="header__dark"
                  navigationIcon="navigation__link-dark"
                />
                <ProtectedRouteElement
                  component={SavedMovies}
                  loggedIn={loggedIn}
                  moviesList={savedMovies}
                  searchText={searchText}
                  onSaveCard={handleSaveMovie}
                  onDeleteCard={handleDeleteMovie}
                  savedMovies={savedMovies}
                  setSearchText={setSearchText}
                />
                <ProtectedRouteElement component={Footer} loggedIn={loggedIn} />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <ProtectedRouteElement
                  component={Header}
                  loggedIn={loggedIn}
                  openButtonMenu={handleClickMenu}
                  classnames="header__dark"
                  navigationIcon="navigation__link-dark"
                />
                <ProtectedRouteElement
                  component={Profile}
                  loggedIn={loggedIn}
                  onProfile={handleUpdateUserInfo}
                  onSignOut={onSignOut}
                  errorMessage={errorMessage}
                />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <Login onLogin={handleLogin} errorMessage={errorMessage} />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                onRegister={hadleRegister}
                errorMessage={errorMessage}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Menu isOpenMenu={isOpenButtonMenu} onClose={closeAllPopup} />
        <InfoTooltip
          isOpen={isInfoTooltip}
          onClose={closeAllPopup}
          status={message}
          succes={succesInfoToolTip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}