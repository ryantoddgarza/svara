import React, { Fragment } from 'react';
import { systemOutput } from '../../../../utils/WebAudio/audio-context';

const ControlsEnd = () => {
  const onVolumeChange = (e) => {
    localStorage.setItem('volume', e.target.value);
    systemOutput.setGain(e);
  };

  return (
    <Fragment>
      <i className="material-icons">volume_up</i>
      <input
        onChange={onVolumeChange}
        defaultValue={systemOutput.initVolume}
        title="volume"
        className="playback-controls__volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        aria-labelledby="title"
      />
    </Fragment>
  );
};

export default ControlsEnd;
