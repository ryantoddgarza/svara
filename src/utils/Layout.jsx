import React from 'react';
import MobileHeader from '../components/organisms/MobileHeader';
import Player from '../components/organisms/Player';

const Layout = (props) => {
  return (
    <div className="layout-container">
      <MobileHeader />
      <main>
        { props.children }
      </main>
      <Player />
    </div>
  )
}

export default Layout;
