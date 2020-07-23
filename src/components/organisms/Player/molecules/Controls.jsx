import React from 'react';
import getSynthEngine from '../../../../utils/SynthEngine/synthEngine';

const Controls = (props) => {
  return (
    <div className="player__controls">
      <button className="player__play-button" onClick={ getSynthEngine.play }>
        <i id="play-icon" className="material-icons">play_arrow</i>
      </button>
    </div>
  )
}

export default Controls;
