import React, { Component } from 'react';
import { useSynthEngine } from '../../../utils/SynthEngine';

const LocalComponent = (props) => {
  return (
    <React.Fragment>
      <p>isPlaying: { props.synthEngine.isPlaying.toString() }</p>
      <button onClick={ () => props.synthEngine.setIsPlaying(!props.synthEngine.isPlaying) }>toggle</button>
    </React.Fragment>
  )
}
const UseSynthEngine = useSynthEngine(LocalComponent);

class Player extends Component {
  render() {
    return (
      <div className="player">
        <UseSynthEngine />
      </div>
    )
  }
}

export default Player;
