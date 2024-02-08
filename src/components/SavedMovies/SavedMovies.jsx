import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

export default function SavedMovies({
  moviesList,
  onDeleteCard,
  savedMovies,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [allMovies, setAllMovies] = useState([]); //массив фильмов
  const [isCheckbox, setCheckbox] = useState(false); //состояние чекбокса
  const [shortMovies, setShortMovies] = useState([]); //короткомтеражки
  const [isSearchText, setSearchText] = useState(""); //состояние текста поиска
  const [message, setMessage] = useState(false);
  const [isFound, setIsFound] = useState(true);

  useEffect(() => {
    setAllMovies(moviesList);
  }, [moviesList]);

  //запуск функции с короткометражками
  useEffect(() => {
    getOnSearchMovies();
    setShortMovies(onSearchShortMovies(savedMovies));
  }, [isCheckbox, isSearchText, savedMovies])

  //функция изменения положения чекбокса
  const handleChangeCheckbox = () => {
    setCheckbox(!isCheckbox);
  };

  //поиск по массиву с фильмами в инпуте "movieTitle", фильтрация с
  // использованием методов:для массивов и строк
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
    try {
      if (isSearchText.length > 0) {
        const foundMovies = onSearch(moviesList, isSearchText);
        if (foundMovies.length === 0) {
          setMessage(false);
          setIsFound(false);
        } else {
          setAllMovies(foundMovies);
          setIsFound(true);
        }
      }
      return;
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
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
          onDeleteCard={onDeleteCard}
          isFound={isFound}
        />
      )}
    </main>
  );
}