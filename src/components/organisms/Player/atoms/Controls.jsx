import React from 'react';
import getSynthEngine from '../../../../utils/SynthEngine/synthEngine';

const Controls = (props) => {
  return (
    <div className="player__controls">
      <button className="player__play-button" onClick={ getSynthEngine.play }>
        <i id="play-icon">play</i>
      </button>
      <button onClick={ props.resume }>resume</button>
      <button onClick={ props.suspend }>suspend</button>
    </div>
  )
}

export default Controls;
