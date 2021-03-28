import React from 'react';
import PropTypes from 'prop-types';
import Header from '~/components/Header';
import Navbar from '~/components/Navbar';
import Player from '~/components/Player';

const Layout = ({ children }) => (
  <>
    <Header>
      <Navbar />
    </Header>
    <main>{children}</main>
    <Player />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
