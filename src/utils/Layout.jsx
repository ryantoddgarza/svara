import React from 'react';
import Player from '../components/organisms/Player';

const Layout = (props) => {
  return (
    <div className="wrap">
      <nav>navbar</nav>
      <main>
        { props.children }
      </main>
      <Player />
    </div>
  )
}

export default Layout;
