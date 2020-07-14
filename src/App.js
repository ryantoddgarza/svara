import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as routes from './constants/routes';
import home from './pages/home';
import listen from './pages/listen';

const App = () => {
  return (
    <div className="app">
      <Switch>
        <Route path={ routes.LANDING } exact component={ home } />
        <Route path={ routes.HOME } component={ home } />
        <Route path={ routes.LISTEN } component={ listen } />
      </Switch>
    </div>
  )
}

export default App;
