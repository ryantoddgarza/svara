import React, { useState, useEffect, Fragment } from 'react';
import { synthEngine } from '../../../../utils/SynthEngine';

const Controls = () => {
  const [isPlaying, setIsPlaying] = useState(synthEngine.isPlaying);

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
    synthEngine.play();
    setIsPlaying(synthEngine.isPlaying);
  };

  useEffect(() => {
    setPlayIcon();
  });

  return (
    <Fragment>
      <button className="player__play-button" type="button" onClick={handlePlayClick}>
        <i id="play-icon" className="material-icons md-48" aria-labelledby="title" />
      </button>
    </Fragment>
  );
};

export default Controls;
