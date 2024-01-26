import { Link } from "react-router-dom";
import headerLogo from "../../images/headerLogo.svg";

export default function Login() {
  return (
    <main>
      <section className="authorization">
        <div className="authorization__container">
          <Link className="authorization__logo" to="/">
            <img src={headerLogo} alt="логотип сайта" />
          </Link>
          <h2 className="authorization__title">Рады видеть!</h2>
          <form className="authorization__form">
            <div className="authorization__input-container">
              <label className="authorization__input-label" type="email">
                E-mail
              </label>
              <input
                className="authorization__input"
                name="email"
                id="email"
                minLength="2"
                maxLength="20"
                value="pochta@yandex.ru"
                required
              />
            </div>
            <div className="authorization__input-container">
              <label className="authorization__input-label" type="password">
                Пароль
              </label>
              <input
                type="password"
                className="authorization__input"
                name="password"
                id="password"
                placeholder=""
                minLength="2"
                maxLength="20"
                required
              ></input>
            </div>
            <button className="authorization__button-submit" type="submit">
              Войти
            </button>
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
