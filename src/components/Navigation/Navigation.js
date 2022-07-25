import { NavLink } from 'react-router-dom';
import constants from 'constants';
import s from './Navigation.module.css';

export default function Navigation() {
  const { home, movies } = constants;

  return (
    <nav className={s.nav}>
      <li className={s.navItem}>
        <NavLink
          exact="true"
          className={({ isActive }) => (isActive ? s.activeLink : s.link)}
          to={home}
        >
          Home
        </NavLink>
      </li>
      <li className={s.navItem}>
        <NavLink
          className={({ isActive }) => (isActive ? s.activeLink : s.link)}
          to={movies}
        >
          Movies
        </NavLink>
      </li>
    </nav>
  );
}
