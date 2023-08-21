import React, { useState, useEffect } from 'react';
import { MdPlayArrow, MdPause, MdVolumeUp } from 'react-icons/md';
import Patch from 'svara-patch-bloom';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [ragaName, setRagaName] = useState('');

  const getLocalVolume = () => localStorage.getItem('volume');
  const initVolume = getLocalVolume() || 1;

  useEffect(() => {
    Patch.init();
    Patch.volume.setGain(initVolume);
    setRagaName(Patch.nucleus.raga.name);
    // TODO: Reimplement after patch & scheduler refactor
    // setIsPlaying(Patch.audioScheduler.isRunning);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      Patch.stop();
    }
    if (!isPlaying) {
      Patch.start();
    }
    setIsPlaying(!isPlaying);
  };

  const onVolumeChange = (e) => {
    Patch.volume.setGain(e.target.value);
  };

  const onVolumeMouseUp = (e) => {
    localStorage.setItem('volume', e.target.value);
  };

  return (
    <div className="player light">
      <div className="layout">
        <div className="grid">
          <div className="start">
            <div className="item-group">
              <div className="item">{ragaName}</div>
            </div>
          </div>
          <div className="center">
            <button className="item" onClick={togglePlay} type="button">
              {isPlaying ? (
                <MdPause className="control--pause" />
              ) : (
                <MdPlayArrow className="control--play" />
              )}
            </button>
          </div>
          <div className="end">
            <div className="item-group from-tablet">
              <MdVolumeUp className="item icon sm" />
              <input
                onChange={onVolumeChange}
                onMouseUp={onVolumeMouseUp}
                defaultValue={initVolume}
                title="volume"
                className="item control--volume"
                type="range"
                min="0"
                max="1"
                step="0.01"
                aria-labelledby="title"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
