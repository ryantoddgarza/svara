import React from 'react';
import { systemOutput } from '../../../../utils/WebAudio/audio-context';

const ControlsEnd = () => {
  const onVolumeChange = (e) => {
    localStorage.setItem('volume', e.target.value);
    systemOutput.setGain(e);
  };

  return (
    <div className="player__end">
      <i className="material-icons">volume_up</i>
      <input
        onChange={onVolumeChange}
        defaultValue={systemOutput.initVolume}
        title="volume"
        className="controls__volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        aria-labelledby="title"
      />
    </div>
  );
};

export default ControlsEnd;
