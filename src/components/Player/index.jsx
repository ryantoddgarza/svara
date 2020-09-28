import React, { useState, useEffect } from 'react';
import { systemOutput } from '~/synth/modules/audioContext';
import synthEngine from '~/synth/modules/synthEngine';
import nucleus from '~/synth/modules/nucleus';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(synthEngine.isPlaying);
  const [ragaName, setRagaName] = useState('');

  useEffect(() => {
    setRagaName(nucleus.raga.name); // TODO: Make dynamic
  });

  const setPlayIcon = () => {
    const playIcon = document.getElementById('play-icon');

    if (!isPlaying) {
      playIcon.innerHTML = 'play_arrow';
      playIcon.title = 'play';
    }

    if (isPlaying) {
      playIcon.innerHTML = 'pause';
      playIcon.title = 'pause';
    }
  };

  useEffect(() => {
    setPlayIcon();
  });

  const onPlay = () => {
    synthEngine.play();
    setIsPlaying(synthEngine.isPlaying);
  };

  const onVolumeChange = (e) => {
    systemOutput.setGain(e.target.value);
  };

  const onVolumeMouseUp = (e) => {
    localStorage.setItem('volume', e.target.value);
  };

  return (
    <div className="player">
      <div className="container player__bottom-row">
        <div className="player__start">
          <div className="player__media-info">
            <span>{ragaName}</span>
          </div>
        </div>
        <div className="player__center">
          <button onClick={onPlay} type="button">
            <i
              id="play-icon"
              className="material-icons md-48"
              aria-labelledby="id"
            />
          </button>
        </div>
        <div className="player__end">
          <i className="material-icons">volume_up</i>
          <input
            onChange={onVolumeChange}
            onMouseUp={onVolumeMouseUp}
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
      </div>
    </div>
  );
};

export default Player;
