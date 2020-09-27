import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './utils/Layout';
import include from './utils/include';
import { synthEngine } from './utils/SynthEngine';
import './utils/lazy-load';
import './utils/a11y';

import { LANDING, HOME, VISUALIZER } from './constants/routes';
import Visualizer from './pages/visualizer';
import Home from './pages/home';

class App extends Component {
  componentDidMount() {
    include.sheet('https://fonts.googleapis.com/icon?family=Material+Icons');
    synthEngine.init();
  }

  render() {
    return (
      <div className="app">
        <Layout>
          <Switch>
            <Route path={LANDING} exact component={Visualizer} />
            <Route path={HOME} component={Home} />
            <Route path={VISUALIZER} component={Visualizer} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
