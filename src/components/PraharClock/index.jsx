import React, { useState, useEffect } from 'react';
import nucleus from '~/synth/modules/nucleus';

const PraharClock = () => {
  const getCurrentTime = () => new Date().toLocaleTimeString('it-IT');

  const [clock, setclock] = useState(getCurrentTime);
  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      setclock(getCurrentTime);
    }, 1000);

    return function cleanup() {
      clearInterval(timer);
      timer = null;
    };
  });

  return (
    <div className="visualizer__prahar">
      <div className="visualizer__prahar-numeral">{nucleus.raga.prahar}</div>
      <div className="visualizer__prahar-clock">{clock}</div>
    </div>
  );
};

export default PraharClock;
