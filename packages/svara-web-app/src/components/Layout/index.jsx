import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Player from '../Player';

const Layout = ({ children }) => (
  <div className="app">
    <Header />
    <div className="main">{children}</div>
    <Player />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
