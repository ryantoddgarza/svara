import React, { useState, useEffect } from 'react';
import { MdPlayArrow, MdPause, MdVolumeUp } from 'react-icons/md';
import { modules, patch } from '@svara/kriya';
import { Player as StyledPlayer, PlayerRow } from './styled';

const { synthEngine } = modules;

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(synthEngine.isPlaying);
  const [ragaName, setRagaName] = useState('');

  const getLocalVolume = () => localStorage.getItem('volume');
  const initVolume = getLocalVolume() || 1;

  useEffect(() => {
    patch.init();
    patch.systemOutput.setGain(initVolume);
    setRagaName(patch.nucleus.raga.name);
  });

  const onPlay = () => {
    patch.play();
    setIsPlaying(synthEngine.isPlaying);
  };

  const onVolumeChange = (e) => {
    patch.systemOutput.setGain(e.target.value);
  };

  const onVolumeMouseUp = (e) => {
    localStorage.setItem('volume', e.target.value);
  };

  return (
    <StyledPlayer className="player">
      <PlayerRow className="player__bottom-row">
        <div className="player__start">
          <div className="player__media-info">
            <span>{ragaName}</span>
          </div>
        </div>
        <div className="player__center">
          <button onClick={onPlay} type="button">
            {isPlaying ? (
              <MdPause className="player__icon--pause" />
            ) : (
              <MdPlayArrow className="player__icon--play" />
            )}
          </button>
        </div>
        <div className="player__end">
          <MdVolumeUp className="icon" />
          <input
            onChange={onVolumeChange}
            onMouseUp={onVolumeMouseUp}
            defaultValue={initVolume}
            title="volume"
            className="control--volume"
            type="range"
            min="0"
            max="1"
            step="0.01"
            aria-labelledby="title"
          />
        </div>
      </PlayerRow>
    </StyledPlayer>
  );
};

export default Player;
