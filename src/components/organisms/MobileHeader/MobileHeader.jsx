import React from 'react';
import { NavLink } from 'react-router-dom';
import * as routes from '../../../constants/routes';

const MobileHeader = () => {
  return (
    <div className="mobile-header">
      <nav className="mobile-header__nav">
        <ul className="mobile-header__nav-list">
          <li className="mobile-header__nav-item">
            <NavLink to={ routes.HOME }>home</NavLink>
          </li>
          <li className="mobile-header__nav-item">
            <NavLink to={ routes.VISUALIZER }>visualizer</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
};

export default MobileHeader;
