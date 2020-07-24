import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
// import * as routes from './constants/routes';
import include from './utils/include';
import Layout from './utils/Layout';
import getSynthEngine from './utils/SynthEngine/synthEngine';

class App extends Component {
  componentDidMount() {
    include.sheet('https://fonts.googleapis.com/icon?family=Material+Icons');
    include.script('/a11y.js');
  }

  render() {
    getSynthEngine;
    return (
      <div className="app">
        <Layout>
        </Layout>
      </div>
    )
  }
};

export default App;
