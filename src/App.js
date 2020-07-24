import React, { Component } from 'react';
import { appendScript } from './utils/appendScript';
// import { Route, Switch } from 'react-router-dom';
// import * as routes from './constants/routes';
import Player from './components/organisms/Player';
import getSynthEngine from './utils/SynthEngine/synthEngine';

class App extends Component {
  componentDidMount() {
    appendScript('/a11y.js');
  }

  render() {
    getSynthEngine;
    return (
      <div className="app">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <Player />
      </div>
    )
  }
}

export default App;
