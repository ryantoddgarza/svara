import React, { Component } from 'react';
// import { Route, Switch } from 'react-router-dom';
// import * as routes from './constants/routes';
// import home from './pages/home';
// import listen from './pages/listen';
// import SynthEngine from './components/organisms/SynthEngine';
import Player from './components/organisms/Player';
// import { withSynthEngine } from './utils/SynthEngine';
import getSynthEngine, { SynthEngine } from './utils/SynthEngine/synthEngine';

const synthEngine = () => new SynthEngine();

// const LocalComponent = () => {
//   const handlePlay = () => {
//     console.log('clicked play')
//   }

//   return (
//     <React.Fragment>
//       <Player />
//       <SynthEngine />
//     </React.Fragment>
//   )
// };

// const WithSynthEngine = withSynthEngine(LocalComponent);

class App extends Component {
  render() {
    getSynthEngine();
    return (
      <div className="app">
        <Player />
      </div>
    )
  }
}

export default App;
