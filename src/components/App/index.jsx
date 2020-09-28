import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LANDING, HOME, VISUALIZER } from '~/constants/routes';
import synthEngine from '~/synth/modules/synthEngine';
import include from '~/scripts/include';

import '~/scripts/lazyLoad';
import '~/scripts/a11y';

import Layout from '~/components/Layout';
import Visualizer from '~/pages/visualizer';
import Home from '~/pages/home';

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
