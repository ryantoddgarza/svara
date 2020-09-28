import React from 'react';
import PropTypes from 'prop-types';
import MobileHeader from '~/components/MobileHeader';
import Player from '~/components/Player';

const Layout = ({ children }) => (
  <div className="layout-container">
    <MobileHeader />
    <main>{children}</main>
    <Player />
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
