import React from 'react';
import MobileHeader from '~/components/MobileHeader';
import Player from '~/components/Player';

const Layout = (props) => (
  <div className="layout-container">
    <MobileHeader />
    <main>{props.children}</main>
    <Player />
  </div>
);

export default Layout;
