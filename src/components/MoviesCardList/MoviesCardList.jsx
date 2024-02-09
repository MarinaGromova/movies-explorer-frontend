import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

import {
  SCREEN_DESKTOP,
  SCREEN_MEDIUM,
  SCREEN_MOBILE,
  MOVIES_COUNT_SCREEN_DESKTOP,
  MOVIES_COUNT_SCREEN_MEDIUM,
  MOVIES_COUNT_SCREEN_MOBILE,
  MORE_MOVIES_COUNT_SCREEN_DESKTOP,
  MORE_MOVIES_COUNT_SCREEN_MEDIUM,
  MORE_MOVIES_COUNT_SCREEN_MOBILE,
} from "../../utils/Constants";

export default function MoviesCardList({
  movies,
  savedMovies,
  onDeleteCard,
  onSaveCard,
  isFound,
  isSavedCard
}) {
  const [moviesToList, setMoviesToList] = useState([]);
  const [isPreloaderActive, setPreloaderActive] = useState(false);
  const [biggerMoviesCount, setBiggerMoviesCount] = useState(0);
  const [moviesCount, setMoviesCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const location = useLocation();

  useEffect(() => {
    setMoviesToList(movies);
  }, [movies]);

  useEffect(() => {
    checkedCountMovies();
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  useEffect(() => {
    setMoviesToList(movies.slice(0, moviesCount));
    movies.length > moviesCount
      ? setPreloaderActive(true)
      : setPreloaderActive(false);
  }, [movies, moviesCount]);

  //функция зависимости ширины экрана от количества фильмов
  const checkedCountMovies = () => {
    if (windowWidth >= SCREEN_MOBILE && windowWidth < SCREEN_MEDIUM) {
      setBiggerMoviesCount(MORE_MOVIES_COUNT_SCREEN_MOBILE);
      setMoviesCount(MOVIES_COUNT_SCREEN_MOBILE);
    }
    if (windowWidth >= SCREEN_MEDIUM && windowWidth < SCREEN_DESKTOP) {
      setBiggerMoviesCount(MORE_MOVIES_COUNT_SCREEN_MEDIUM);
      setMoviesCount(MOVIES_COUNT_SCREEN_MEDIUM);
    }
    if (windowWidth >= SCREEN_DESKTOP) {
      setBiggerMoviesCount(MORE_MOVIES_COUNT_SCREEN_DESKTOP);
      setMoviesCount(MOVIES_COUNT_SCREEN_DESKTOP);
    }
  };

  //функция изменения размера ширины экрана устройства
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  //функция показывает больше фильмов
  const handleButtonPreloader = () => {
    checkedCountMovies();
    setMoviesToList(movies.slice(0, moviesToList.length + biggerMoviesCount));
    if (moviesToList.length >= movies.length - biggerMoviesCount) {
      setPreloaderActive(false);
    }
  };

  return (
    <section className="cards">
      {isFound ? (
        <>
          <ul className="cards__list">
            {moviesToList.map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie.movieId}
                savedMovies={savedMovies}
                onDeleteCard={onDeleteCard}
                onSaveCard={onSaveCard}
                isSavedCard={isSavedCard}
              />
            ))}
          </ul>
          {isPreloaderActive && location.pathname === "/movies" && (
            <button
              onClick={handleButtonPreloader}
              type="button"
              className="cards__button"
            >
              Ещё
            </button>
          )}
        </>
      ) : (
        <h3 className="cards__not-found">Ничего не найдено</h3>
      )}
    </section>
  );
}