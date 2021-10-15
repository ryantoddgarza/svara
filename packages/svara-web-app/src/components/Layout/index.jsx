import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Player from '../Player';

const Layout = ({ children }) => (
  <>
    <Header />
    <div className="layout__main">{children}</div>
    <Player />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
