import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { home, visualizer } from '../../cms';

const menu = [
  {
    name: 'home',
    path: home.settings.path,
  },
  {
    name: 'visualizer',
    path: visualizer.settings.path,
  },
];

const Header = () => (
  <div className="header light">
    <div className="layout">
      <div className="grid">
        <div className="item title">
          <Link className="text" to={home.settings.path}>
            svara
          </Link>
        </div>
        <nav className="nav">
          {menu.map(({ name, path }) => (
            <div className="item" key={`key_${name}`}>
              <NavLink className="link" to={path} exact>
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
