import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LANDING, HOME, VISUALIZER } from '~/constants/routes';
import VisualizerPage from '~/pages/VisualizerPage';
import HomePage from '~/pages/HomePage';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path={LANDING} exact component={HomePage} />
      <Route path={HOME} component={HomePage} />
      <Route path={VISUALIZER} component={VisualizerPage} />
    </Switch>
  </BrowserRouter>
);
export default App;
