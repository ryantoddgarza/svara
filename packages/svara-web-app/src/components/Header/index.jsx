import React from 'react';
import { Link } from 'gatsby';
import { HOME, VISUALIZER } from '~/constants/routes';

const Header = () => (
  <div className="header">
    <header className="header__contents container">
      <Link className="header__site-link" to={HOME}>
        <div className="header__site-title">svara</div>
      </Link>
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <Link to={HOME}>about</Link>
          </li>
          <li className="header__nav-item">
            <Link to={VISUALIZER}>visualizer</Link>
          </li>
        </ul>
      </nav>
    </header>
  </div>
);

export default Header;
