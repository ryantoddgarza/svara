import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
// import * as routes from './constants/routes';
// import SynthEngine from './components/organisms/SynthEngine';
// import home from './pages/home';
// import listen from './pages/listen';
import Player from './components/organisms/Player';
import { withSynthEngine } from './utils/SynthEngine';

const LocalComponent = () => {
  return (
    <React.Fragment>
      <Player />
    </React.Fragment>
  )
};

const WrappedComponent = withSynthEngine(LocalComponent);

class App extends Component {
  render() {
    return (
      <div className="app">
        <WrappedComponent />
      </div>
    )
  }
}

export default App;
