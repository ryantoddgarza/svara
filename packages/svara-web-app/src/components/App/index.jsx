import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { LANDING, HOME, VISUALIZER } from '~/constants/routes';
import patch from '~/synth/patch';
import Layout from '~/components/Layout';
import Visualizer from '~/pages/visualizer';
import Home from '~/pages/home';

const App = () => {
  useEffect(() => {
    patch.init();
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
