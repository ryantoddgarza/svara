import React, { Component } from 'react';
import ControlsCenter from './molecules/ControlsCenter';
import ControlsEnd from './molecules/ControlsEnd';

const Player = () => {
  return (
    <div className="player">
      <div className="player__bottom-row">
        <div className="player__start">1</div>
        <div className="player__center">
          <ControlsCenter />
        </div>
        <div className="player__end">
          <ControlsEnd />
        </div>
      </div>
    </div>
  )
}

export default Player;
