import React from 'react';
import { Nav as StyledNav, NavLink } from './styled';
import menu from './menu';

const Nav = () => (
  <StyledNav>
    {menu.map(({ name, path }) => (
      <NavLink to={path} key={`key__${name}`}>
        {name}
      </NavLink>
    ))}
  </StyledNav>
);

export default Nav;
