import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LANDING, HOME, VISUALIZER } from '../../constants/routes';

const menu = [
  {
    name: 'home',
    path: HOME,
  },
  {
    name: 'visualizer',
    path: VISUALIZER,
  },
];

const Header = () => (
  <div className="header light">
    <div className="layout">
      <div className="grid">
        <div className="item title">
          <Link className="text" to={LANDING}>
            svara
          </Link>
        </div>
        <nav className="nav">
          {menu.map(({ name, path }) => (
            <div className="item" key={`key_${name}`}>
              <NavLink className="link" to={path}>
                {name}
              </NavLink>
            </div>
          ))}
        </nav>
      </div>
    </div>
  </div>
);

export default Header;
