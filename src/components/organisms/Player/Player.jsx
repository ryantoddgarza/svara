import React, { Component } from 'react';
import context from '../../../utils/WebAudio/audioContext';
import { useSynthEngine } from '../../../utils/SynthEngine';
import Controls from './atoms/controls';

// const LocalComponent = (props) => {
//   // const toggleIsPlaying = () => {
//   //   props.synthEngine.play();
//   //   props.synthEngine.setIsPlaying(!props.synthEngine.isPlaying);
//   // }

//   return (
//     <React.Fragment>
//       <button onClick={ props.synthEngine.play }>toggle `isPlaying`</button>
//     </React.Fragment>
//   )
// }
// const UseSynthEngine = useSynthEngine(LocalComponent);

const Player = () => {
  const resumeAudioContext = () => {
    context.resume();
  };

  const suspendAudioContext = () => {
    context.suspend();
  };

  return (
    <div className="player">
      <p>rendered from Player.jsx</p>
      {/* <UseSynthEngine /> */}
      <Controls resume={ resumeAudioContext }
                suspend={ suspendAudioContext } />
    </div>
  )
}

export default Player;
