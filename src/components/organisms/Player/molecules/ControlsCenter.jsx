import React, { useState, useEffect } from 'react';
import { synthEngine } from '~/utils/SynthEngine';

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

  const onPlay = () => {
    synthEngine.play();
    setIsPlaying(synthEngine.isPlaying);
  };

  useEffect(() => {
    setPlayIcon();
  });

  return (
    <div className="player__center">
      <button onClick={onPlay} type="button">
        <i
          id="play-icon"
          className="material-icons md-48"
          aria-labelledby="id"
        />
      </button>
    </div>
  );
};

export default Controls;
