import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LANDING } from '~/constants/routes';
import menu from './menu';

const Navbar = () => (
  <nav className="navbar">
    <Link className="navbar__site-title" to={LANDING}>
      svara
    </Link>
    <ul className="navbar__list">
      {menu.map(({ name, path }) => (
        <li className="navbar__item" key={`key__${name}`}>
          <NavLink to={path}>{name}</NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navbar;
