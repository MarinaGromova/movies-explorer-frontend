import { Link } from "react-router-dom";
import headerLogo from "../../images/headerLogo.svg";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { EMAIL_REGEX, USER_NAME_REGEX } from "../../utils/Constants";

export default function Register({ onRegister, errorMessage }) {
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <main>
      <section className="authorization">
        <div className="authorization__container">
          <Link className="authorization__logo" to="/">
            <img
              className="authorization__logo-img"
              src={headerLogo}
              alt="логотип сайта"
            />
          </Link>
          <h2 className="authorization__title">Добро&nbsp;пожаловать!</h2>
          <form
            className="authorization__form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="authorization__input-container">
              <label className="authorization__input-label">Имя</label>
              <span
                className={`authorization__span name-input-error ${
                  errors.name ? "authorization__span_active" : ""
                }`}
              >
                {errors.name}
              </span>
              <input
                className="authorization__input"
                type="text"
                name="name"
                id="name-input"
                minLength="2"
                maxLength="20"
                value={values.name || ""}
                onChange={handleChange}
                pattern={USER_NAME_REGEX}
                autoComplete="username"
                required
              />
            </div>
            <div className="authorization__input-container">
              <label className="authorization__input-label">E-mail</label>
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
                value={values.email || ""}
                onChange={handleChange}
                pattern={EMAIL_REGEX}
                autoComplete="username"
                required
              />
            </div>
            <div className="authorization__input-container">
              <label className="authorization__input-label">Пароль</label>
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
                id="password-input"
                placeholder=""
                value={values.password || ""}
                onChange={handleChange}
                autoComplete="new-password"
                minLength="2"
                maxLength="20"
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
                Зарегистрироваться
              </button>
            </div>
          </form>
          <div className="authorization__register">
            <p className="authorization__text">Уже зарегистрированы?</p>
            <Link className="authorization__link" to="/signin">
              Войти
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
