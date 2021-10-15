import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HOME, VISUALIZER, NOT_FOUND } from '../../constants/routes';
import HomePage from '../../pages/HomePage';
import VisualizerPage from '../../pages/VisualizerPage';
import NotFoundPage from '../../pages/NotFoundPage';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path={HOME} exact component={HomePage} />
      <Route path={VISUALIZER} component={VisualizerPage} />
      <Route path={NOT_FOUND} component={NotFoundPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
