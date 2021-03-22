import React from 'react';
import { NavLink } from 'react-router-dom';
import { LANDING, HOME, VISUALIZER } from '~/constants/routes';

const Header = () => (
  <div className="header">
    <header className="header__contents container">
      <NavLink className="header__site-link" to={LANDING}>
        <div className="header__site-title">svara</div>
      </NavLink>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <NavLink to={HOME}>about</NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink to={VISUALIZER}>visualizer</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  </div>
);

export default Header;
