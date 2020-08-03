import React from 'react';
import ControlsStart from './molecules/ControlsStart';
import ControlsCenter from './molecules/ControlsCenter';
import ControlsEnd from './molecules/ControlsEnd';

const Player = () => (
  <div className="player">
    <div className="container player__bottom-row">
      <div className="player__start">
        <ControlsStart />
      </div>
      <div className="player__center">
        <ControlsCenter />
      </div>
      <div className="player__end">
        <ControlsEnd />
      </div>
    </div>
  </div>
);

export default Player;
