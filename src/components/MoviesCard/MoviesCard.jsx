import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function MoviesCard({
  movie,
  savedMovies,
  isSavedCard,
  onDeleteCard,
  onSaveCard,
}) {
  const location = useLocation();

  let isLiked = false;

  let likedId;
  isLiked = savedMovies.some((card) => {
    if (card.movieId === movie.movieId) {
      likedId = card._id;
      return true;
    }
    return false;
  });

  //переводим продолжительность в другой формат
  const handleDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const minute = duration - hours * 60;
    return `${hours}ч ${minute}м`;
  };

  //функция лайка
  const onLikeandSave = () => {
    if (isLiked || isSavedCard) {
      onDeleteCard(movie._id ? movie._id : likedId);
    } else {
      onSaveCard(movie);
    }
  };

  //функция лайка
  const onLikeandDelete = () => {
    onDeleteCard(movie._id ? movie._id : likedId);
  };

  return (
    <li className="card">
      <div className="card__description">
        <h2 className="card__title">{movie.nameRU}</h2>
        <p className="card__subtitle">{handleDuration(movie.duration)}</p>
      </div>
      <Link to={movie.trailerLink} target="_blank">
        <img
          className="card__image"
          src={
            movie.image.url
              ? "https://api.nomoreparties.co" + movie.image.url
              : movie.image
          }
          alt={movie.nameRU}
        />
      </Link>
      {location.pathname === "/saved-movies" ? (
        <button
          onClick={onLikeandDelete}
          type="button"
          className="card__button card__button_remove"
        ></button>
      ) : (
        <button
          onClick={onLikeandSave}
          type="button"
          className={
            isSavedCard
              ? "card__button card__button_remove"
              : isLiked
              ? "card__button card__button-choose"
              : "card__button"
          }
        ></button>
      )}
    </li>
  );
}