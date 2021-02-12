import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LANDING, HOME, VISUALIZER } from '~/constants/routes';
import synthEngine from '~/synth/modules/synthEngine';
import Layout from '~/components/Layout';
import Visualizer from '~/pages/visualizer';
import Home from '~/pages/home';

const App = () => {
  useEffect(() => {
    synthEngine.init();
  }, []);

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
};

export default App;
