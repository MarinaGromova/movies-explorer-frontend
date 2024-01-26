import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <main className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="profile__form">
          <div className="profile__input-container">
            <label className="profile__label">Имя</label>
            <input
              id="name-input"
              type="text"
              className="profile__input"
              placeholder="Введите имя"
              maxLength="20"
              minLength="2"
              value='Виталий'
              required
            />
          </div>
          <div className="profile__input-container">
            <label className="profile__label">E-mail</label>
            <input
              id="email-input"
              type="email"
              className="profile__input"
              placeholder="Введите пароль"
              maxLength="20"
              minLength="2"
              value='pochta@yandex.ru'
              required
            />
          </div>
        </form>
        <div className="profile__button">Редактировать</div>
        <Link to="/" className="profile__link">
          Выйти из аккаунта
        </Link>
      </div>
    </main>
  );
}
