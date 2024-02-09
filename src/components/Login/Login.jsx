import { useEffect } from "react";
import { Link } from "react-router-dom";
import headerLogo from "../../images/headerLogo.svg";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { EMAIL_REGEX } from "../../utils/Constants";

export default function Login({ onLogin, errorMessage }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ password: values.password, email: values.email });
  };

  return (
    <main>
      <section className="authorization">
        <div className="authorization__container">
          <Link className="authorization__logo" to="/">
            <img src={headerLogo} alt="логотип сайта" />
          </Link>
          <h2 className="authorization__title">Рады видеть!</h2>
          <form className="authorization__form" onSubmit={handleSubmit} noValidate>
            <div className="authorization__input-container">
              <label className="authorization__input-label" type="email">
                E-mail
              </label>
              <span
                className={`authorization__span email-input-error ${
                  errors.email ? "authorization__span_active" : ""
                }`}
              >
                {errors.email}
              </span>
              <input
                className="authorization__input"
                name="email"
                id="email-input"
                minLength="2"
                maxLength="20"
                onChange={handleChange}
                value={values.email || ""}
                pattern={EMAIL_REGEX}
                autoComplete="username"
                required
              />
            </div>
            <div className="authorization__input-container">
              <label className="authorization__input-label" type="password">
                Пароль
              </label>
              <span
                className={`authorization__span password-input-error ${
                  errors.password ? "authorization__span_active" : ""
                }`}
              >
                {errors.password}
              </span>
              <input
                type="password"
                className="authorization__input"
                name="password"
                placeholder=""
                onChange={handleChange}
                value={values.password || ""}
                id="password-input"
                minLength="2"
                maxLength="20"
                autoComplete="current-password"
                required
              ></input>
            </div>
            <div className="authorization__button-label authorization__button-register">
              <span className="authorization__button-error">
                {errorMessage}
              </span>
              <button
                className={
                  isValid
                    ? "authorization__button-submit"
                    : "authorization__button-submit authorization__button-submit_inactive"
                }
                type="submit"
              >
                Войти
              </button>
            </div>
          </form>
          <div className="authorization__register">
            <p className="authorization__text">Ещё не зарегистрированы?</p>
            <Link className="authorization__link" to="/signup">
              Регистрация
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
