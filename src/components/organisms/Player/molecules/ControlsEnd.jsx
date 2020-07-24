import React, { Fragment } from 'react';
import getSynthEngine from '../../../../utils/SynthEngine/synthEngine';

const ControlsEnd = () => {
  return (
    <Fragment>
      <i className="material-icons">volume_up</i>
      <input
        id="volume"
        className="player__volume-slider"
        type="range"
        min="0"
        max="1"
        step="0.01"
        onChange={ (e) => getSynthEngine.setMasterVolume(e) }
        aria-labelledby="id"
      />
    </Fragment>
  )
}

export default ControlsEnd;
