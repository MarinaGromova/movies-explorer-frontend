import { useEffect, useState } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

export default function SearchForm({ onSearch, searchText, isCheckbox, handleChangeCheckbox }) {
  const { values, isValid, handleChange, resetForm } = useFormWithValidation();
  const [errorMessage, setErrorMessage] = useState("");
  const { movieTitle } = values;

  useEffect(() => {
    resetForm({ movieTitle: searchText });
  }, [searchText]);

  useEffect(() => {
    setErrorMessage("");
  }, [isValid]);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isValid) {
      onSearch(movieTitle);
    } else {
      setErrorMessage("Нужно ввести ключевое слово.");
    }
  }

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit} noValidate>
        <div className="search-form__container">
          <input
            type="text"
            name="movieTitle"
            className="search-form__input"
            placeholder="Фильм"
            value={values.movieTitle || ""}
            minLength="1"
            onChange={handleChange}
            required
            noValidate
          />
          <span
            className={`search-form__input-error ${
              errorMessage ? "search-form__input-error_active" : ""
            }`}
          >
            {errorMessage}
          </span>
          <button type="submit" className="search-form__button">
            Поиск
          </button>
        </div>
        <div className="search-form__checkbox-container">
          <input
            type="checkbox"
            className="search-form__checkbox-input"
            id="switch"
            onChange={handleChangeCheckbox}
            checked={isCheckbox}
            value={isCheckbox}
          />
          <label className="search-form__checkbox" htmlFor="switch"></label>
          <p className="search-form__checkbox-text">Короткометражки</p>
        </div>
      </form>
    </section>
  );
}
