import React from 'react';
import ControlsStart from './molecules/ControlsStart';
import ControlsCenter from './molecules/ControlsCenter';
import ControlsEnd from './molecules/ControlsEnd';

const Player = () => (
  <div className="player">
    <div className="container player__bottom-row">
      <ControlsStart />
      <ControlsCenter />
      <ControlsEnd />
    </div>
  </div>
);

export default Player;
