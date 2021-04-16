import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import theme from '@svara/design-system';
import Header from '~/components/Header';
import Nav from '~/components/Nav';
import Player from '~/components/Player';

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Header>
      <Nav />
    </Header>
    <main>{children}</main>
    <Player />
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
