import React from 'react';

const Layout = (props) => {
  return (
    <div id="wrap">
      <main id="main">
        { props.children }
      </main>
    </div>
  )
}

export default Layout;
