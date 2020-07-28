import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './utils/Layout';
import include from './utils/include';
import { synthEngine } from './utils/SynthEngine';
import './utils/lazyLoad';

import * as routes from './constants/routes';
import Visualizer from './pages/visualizer';

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
            <Route path={routes.LANDING} exact component={Visualizer} />
            <Route path={routes.HOME} component={Visualizer} />
            <Route path={routes.VISUALIZER} component={Visualizer} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
