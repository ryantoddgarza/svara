import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './utils/Layout';
import include from './utils/include';
import lazyLoad from './utils/lazyLoad';
import { synthEngine } from './utils/SynthEngine';

import * as routes from './constants/routes';
import Listen from './pages/listen';

class App extends Component {
  componentDidMount() {
    include.sheet('https://fonts.googleapis.com/icon?family=Material+Icons');
    include.script('/a11y.js');
    synthEngine.init();
  }

  render() {
    return (
      <div className="app">
        <Layout>
          <Switch>
            <Route path={ routes.LANDING } exact component={ Listen } />
            <Route path={ routes.HOME } component={ Listen } />
            <Route path={ routes.LISTEN } component={ Listen } />
          </Switch>
        </Layout>
      </div>
    )
  }
};

export default App;
