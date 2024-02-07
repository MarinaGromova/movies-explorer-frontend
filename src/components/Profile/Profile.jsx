import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { EMAIL_REGEX, USER_NAME_REGEX } from "../../utils/Constants";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({ onSignOut, onProfile, errorMessage }) {
  const { values, errors, isValid, resetForm, handleChange } =
    useFormWithValidation();
  const currentUser = useContext(CurrentUserContext);
  const { email, name } = values;

  //запись в инпуты
  useEffect(() => {
    resetForm({ email: currentUser.email, name: currentUser.name });
  }, [currentUser.email, currentUser.name, resetForm]);

  //обновление профиля
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    onProfile({ email, name });
  };

  return (
    <main className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form
          className="profile__form"
          onSubmit={handleProfileSubmit}
          noValidate
        >
          <div className="profile__input-container">
            <label className="profile__label">Имя</label>
            <span
              className={`profile__span name-input-error ${
                errors.name ? "profile__span_active" : ""
              }`}
            >
              {errors.name}
            </span>
            <input
              id="name-input"
              name="name"
              type="text"
              className="profile__input profile__input_type_name"
              placeholder="Введите имя"
              maxLength="20"
              minLength="2"
              value={values.name || ""}
              onChange={handleChange}
              pattern={USER_NAME_REGEX}
              required
            />
          </div>
          <div className="profile__input-container">
            <label className="profile__label">E-mail</label>
            <span
              className={`profile__span email-input-error ${
                errors.email ? "profile__span_active" : ""
              }`}
            >
              {errors.email}
            </span>
            <input
              id="email-input"
              name="email"
              type="email"
              className="profile__input profile__input_type_email"
              placeholder="Введите почту"
              maxLength="20"
              minLength="2"
              value={values.email ? values.email : ""}
              onChange={handleChange}
              pattern={EMAIL_REGEX}
              required
            />
          </div>
          <div className="profile__button-container">
            <span className="profile__button-error">{errorMessage}</span>
            {isValid ? (
              <button
                type="submit"
                onSubmit={handleProfileSubmit}
                className={"profile__button profile__button_inactive"}
              >
                Сохранить
              </button>
            ) : (
              <button
                type="submit"
                onSubmit={handleProfileSubmit}
                className={"profile__button"}
              >
                Редактировать
              </button>
            )}
          </div>
        </form>
        <Link to="/" className="profile__link" onClick={onSignOut}>
          Выйти из аккаунта
        </Link>
      </div>
    </main>
  );
}
