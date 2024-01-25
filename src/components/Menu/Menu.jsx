import { Link } from "react-router-dom";
import headerIcon from "../../images/headerIcon.svg";

export default function Menu({ isOpenMenu, onClose }) {
  return (
    <div className={isOpenMenu ? `menu menu_opened` : `menu`}>
      <div className="menu__container">
        <button className="menu__button" onClick={onClose}></button>
        <div className="menu__container-link">
          <Link className="menu__popup-link" to="/">
            Главная
          </Link>
          <Link className="menu__popup-link" to="/movies">
            Фильмы
          </Link>
          <Link className="menu__popup-link" to="/saved-movies">
            Сохранённые фильмы
          </Link>
        </div>
        <div className="menu__container-account">
          <Link className="menu__popup-link menu__popup-account" to="/profile">
            Аккаунт
            <img className="menu__popup-img" src={headerIcon} alt="Логотип" />
          </Link>
        </div>
      </div>
    </div>
  );
}
