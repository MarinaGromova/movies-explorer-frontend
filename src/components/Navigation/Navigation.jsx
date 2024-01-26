import { Link } from 'react-router-dom';
import headerIcon from '../../images/headerIcon.svg';

export default function Navigation(props) {
  return (
    <nav className='navigation'>
      <div className='navigation__menu'>
        <Link className='navigation__link' to='/movies'>
          Фильмы
        </Link>
        <Link className='navigation__link' to='/saved-movies'>
          Сохранённые фильмы
        </Link>
      </div>
      <div className='navigation__profile'>
        <Link className='navigation__profile-link' to='/profile'>
          Аккаунт
          <img
            className={`navigation__link-icon ${props.navigationIcon} ? 'navigation__link-dark' : ''}`}
            src={headerIcon}
            alt='Логотип'
          />
        </Link>
      </div>
      <button className='navigation__menu-button' onClick={props.openButtonMenu}></button>
    </nav>
  );
}