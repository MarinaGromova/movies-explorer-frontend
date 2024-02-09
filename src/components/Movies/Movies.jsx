import React, { useEffect, useState, useCallback } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

export default function Movies({
  moviesList,
  savedMovies,
  onSaveCard,
  onDeleteCard,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]); //массив фильмов
  const [isCheckbox, setCheckbox] = useState(false); //состояние чекбокса
  const [shortMovies, setShortMovies] = useState([]); //короткомтеражки
  const [isSearchText, setSearchText] = useState(""); //состояние текста поиска
  const [message, setMessage] = useState(false);
  const [isFound, setIsFound] = useState(true);

  //запуск функции с короткометражками и фильтрацией
  useEffect(() => {
    setShortMovies(onSearchShortMovies(allMovies));
    getOnSearchMovies();
  }, [isSearchText, isCheckbox, moviesList]);

  useEffect(() => {
    getOnSearchMovies();
  }, []);

  useEffect(() => {
    getSearchPrevious();
  }, []);

  //функция изменения положения чекбокса
  const handleChangeCheckbox = () => {
    setCheckbox(!isCheckbox);
  };

  //поиск по массиву с фильмами в инпуте "movieTitle", фильтрация с использованием методов:
  //для массивов и строк
  const onSearch = (moviesList, searchMovie) => {
    return moviesList.filter((movie) => {
      return (
        movie.nameRU.toLowerCase().includes(searchMovie.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchMovie.toLowerCase())
      );
    });
  };

  //функция сортировки фильмов < 40 минут
  const onSearchShortMovies = (moviesList) => {
    return moviesList.filter((movie) => {
      return movie.duration <= 40;
    });
  };

  //сортировка найденных фильмов по строке поиска
  const getOnSearchMovies = () => {
    setIsLoading(true);
    setAllMovies([]);
    try {
      if (isSearchText.length > 0) {
        const foundMovies = onSearch(moviesList, isSearchText);
        if (foundMovies.length === 0) {
          setMessage(false);
          setIsFound(false);
        } else {
          setIsFound(true);
          localStorage.setItem(
            "foundMoviesPrevious",
            JSON.stringify(foundMovies)
          );
          localStorage.setItem("searchTextPrevious", isSearchText);
          localStorage.setItem("checkboxPrevious", JSON.stringify(isCheckbox));
          console.log(foundMovies);
          setAllMovies(foundMovies);
        }
      }
      return;
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  //результат поиска после перезагрузки и выхода
  const getSearchPrevious = () => {
    if (localStorage.getItem("foundMoviesPrevious")) {
      setAllMovies(JSON.parse(localStorage.getItem("foundMoviesPrevious")));
    }
    if (localStorage.getItem("searchTextPrevious")) {
      setSearchText(localStorage.getItem("searchTextPrevious"));
    }
    if (localStorage.getItem("checkboxPrevious")) {
      setCheckbox(JSON.parse(localStorage.getItem("checkboxPrevious")));
    }
    return;
  };

  return (
    <main className="movies">
      <SearchForm
        searchText={isSearchText}
        onSearch={setSearchText}
        isCheckbox={isCheckbox}
        handleChangeCheckbox={handleChangeCheckbox}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          movies={isCheckbox ? shortMovies : allMovies}
          isLoading={isLoading}
          savedMovies={savedMovies}
          onSaveCard={onSaveCard}
          onDeleteCard={onDeleteCard}
          isFound={isFound}
          isSavedCard={false}
        />
      )}
    </main>
  );
}
