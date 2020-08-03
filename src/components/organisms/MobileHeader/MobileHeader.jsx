import React from 'react';
import { NavLink } from 'react-router-dom';
import * as routes from '../../../constants/routes';

const MobileHeader = () => (
  <div className="container mobile-header">
    <div className="mobile-header__contents">
      <div className="mobile-header__site-header">
        <NavLink className="mobile-header__site-logo" to={routes.LANDING}>svara</NavLink>
      </div>
      <nav className="mobile-header__nav">
        <ul className="mobile-header__nav-list">
          <li className="mobile-header__nav-item">
            <NavLink to={routes.HOME}>about</NavLink>
          </li>
          <li className="mobile-header__nav-item">
            <NavLink to={routes.VISUALIZER}>visualizer</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

export default MobileHeader;
