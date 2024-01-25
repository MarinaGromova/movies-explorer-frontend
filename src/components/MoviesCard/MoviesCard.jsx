import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function MoviesCard({ movie }) {
  const [isSavedMovies, setSavedMovies] = useState(false);

  const handleClickSaveButton = () => {
    setSavedMovies(!isSavedMovies);
  };

  const location = useLocation();

  return (
    <li className="card" key={movie._id}>
      <div className="card__description">
        <h2 className="card__title">{movie.title}</h2>
        <p className="card__subtitle">{movie.lasting}</p>
      </div>
      <img className="card__image" src={movie.image} alt="Изображение фильма" />
      {location.pathname === "/saved-movies" ? (
        <button
          type="button"
          className="card__button movie__button_remove"
        ></button>
      ) : (
        <button
          onClick={handleClickSaveButton}
          type="button"
          className={
            isSavedMovies ? "card__button card__button-choose" : "card__button"
          }
        ></button>
      )}
    </li>
  );
}
