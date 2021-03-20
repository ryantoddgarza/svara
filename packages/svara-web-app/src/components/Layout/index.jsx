import React from 'react';
import PropTypes from 'prop-types';
import Header from '~/components/Header';
import Player from '~/components/Player';
import '~/styles/index.scss';

const Layout = ({ children }) => (
  <>
    <Header />
    <main>{children}</main>
    <Player />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
