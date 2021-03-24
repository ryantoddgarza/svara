import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LANDING, HOME, VISUALIZER } from '~/constants/routes';
import Visualizer from '~/pages/Visualizer';
import Home from '~/pages/Home';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path={LANDING} exact component={Visualizer} />
      <Route path={HOME} component={Home} />
      <Route path={VISUALIZER} component={Visualizer} />
    </Switch>
  </BrowserRouter>
);
export default App;
