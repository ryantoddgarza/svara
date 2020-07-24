import React, { useState, useEffect, Fragment } from 'react';
import getSynthEngine from '../../../../utils/SynthEngine/synthEngine';

const Controls = (props) => {
  const [isPlaying, setIsPlaying] = useState(getSynthEngine.status.isPlaying());

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

  const handlePlayClick = () => {
    getSynthEngine.play();
    setIsPlaying(getSynthEngine.status.isPlaying());
  };

  useEffect(() => {
    setPlayIcon();
  });

  return (
    <Fragment>
      <button className="player__play-button" onClick={ handlePlayClick }>
        <i id="play-icon" className="material-icons" aria-labelledby="title"></i>
      </button>
    </Fragment>
  )
};

export default Controls;
