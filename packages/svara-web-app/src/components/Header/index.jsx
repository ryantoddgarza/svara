import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LANDING } from '~/constants/routes';
import { Header as StyledHeader, HeaderContainer, HeaderTitle } from './styled';

const Header = ({ children }) => (
  <StyledHeader>
    <HeaderContainer>
      <HeaderTitle>
        <Link to={LANDING}>svara</Link>
      </HeaderTitle>
      {children}
    </HeaderContainer>
  </StyledHeader>
);

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
