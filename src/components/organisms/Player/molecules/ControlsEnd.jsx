import React, { Fragment } from 'react';
import { systemOutput } from '../../../../utils/WebAudio/audioContext';

const ControlsEnd = () => {
  return (
    <Fragment>
      <i className="material-icons">volume_up</i>
      <input
        id="volume"
        className="playback-controls__volume"
        type="range"
        defaultValue={ systemOutput.initVolume }
        min="0"
        max="1"
        step="0.01"
        onChange={ (e) => systemOutput.setGain(e) }
        aria-labelledby="id"
      />
    </Fragment>
  )
}

export default ControlsEnd;
