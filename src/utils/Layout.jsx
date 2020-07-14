import React from 'react';
import Player from '../components/organisms/Player';

const Layout = (props) => {
  return (
    <div id="wrap">
      <nav>navbar</nav>
      <main id="main">
        { props.children }
      </main>
    </div>
  )
}

export default Layout;
