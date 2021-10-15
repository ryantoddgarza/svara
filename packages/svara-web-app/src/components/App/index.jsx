import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { home, notFound, visualizer } from '../../cms';
import HomePage from '../../pages/HomePage';
import VisualizerPage from '../../pages/VisualizerPage';
import NotFoundPage from '../../pages/NotFoundPage';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path={home.settings.path} exact component={HomePage} />
      <Route path={visualizer.settings.path} component={VisualizerPage} />
      <Route path={notFound.settings.path} component={NotFoundPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
