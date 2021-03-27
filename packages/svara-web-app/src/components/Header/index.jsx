import React from 'react';
import { NavLink } from 'react-router-dom';
import { LANDING } from '~/constants/routes';
import menu from './menu';

const Header = () => (
  <div className="header">
    <header className="header__contents container">
      <NavLink className="header__site-link" to={LANDING}>
        <div className="header__site-title">svara</div>
      </NavLink>
      <nav className="header__nav">
        <ul className="header__nav-list">
          {menu.map(({ name, path }) => (
            <li className="header__nav-item" key={`key__${name}`}>
              <NavLink to={path}>{name}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  </div>
);

export default Header;
