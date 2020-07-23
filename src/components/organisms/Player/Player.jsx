import React, { Component } from 'react';
import { useSynthEngine } from '../../../utils/SynthEngine';

const LocalComponent = (props) => {
  // const toggleIsPlaying = () => {
  //   props.synthEngine.play();
  //   props.synthEngine.setIsPlaying(!props.synthEngine.isPlaying);
  // }

  return (
    <React.Fragment>
      <button onClick={ props.synthEngine.play }>toggle `isPlaying`</button>
    </React.Fragment>
  )
}
const UseSynthEngine = useSynthEngine(LocalComponent);

class Player extends Component {
  render() {
    return (
      <div className="player">
        <p>rendered from Player.jsx</p>
        <UseSynthEngine />
      </div>
    )
  }
}

export default Player;
