import React, { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";

export default function MoviesCardList({ movies }) {
  const [isPreloaderActive, setPreloaderActive] = useState(false);
  const handlePreloaderActive = () => {
    setPreloaderActive(!isPreloaderActive);
  };

  const location = useLocation();

  return (
    <section className="cards">
      <ul className="cards__list">
        {movies.map((movie) => (
          <MoviesCard movie={movie} />
        ))}
      </ul>
      {isPreloaderActive ? (
        <Preloader />
      ) : location.pathname === '/movies' && (
        <button
          onClick={handlePreloaderActive}
          type="button"
          className="cards__button"
        >
          Ещё
        </button>
      )}
    </section>
  );
}
