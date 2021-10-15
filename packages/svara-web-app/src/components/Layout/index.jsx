import React from 'react';
import PropTypes from 'prop-types';
import Header from '~/components/Header';
import Player from '~/components/Player';

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
