import { Link } from 'react-router-dom';
import headerLogo from '../../images/headerLogo.svg';
import Navigation from '../Navigation/Navigation';

export default function Header(props) {
  return (
    <header className={`header ${props.classnames} ? 'header__dark' : ''}`}>
      <div className='header__container'>
        <Link  className='header__link' to='/'>
          <img className='header__logo' src={headerLogo} alt='Логотип' />
        </Link>
        {props.loggedIn ? (
          <Navigation navigationIcon={props.navigationIcon} openButtonMenu={props.openButtonMenu} />
        ) : (
          <nav className='header__nav'>
            <Link className='header__signup' to='./signup'>
              Регистрация
            </Link>
            <Link className='header__signin' to='./signin'>
              Войти
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}