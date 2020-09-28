import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PraharClock = ({ prahar }) => {
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
      <div className="visualizer__prahar-numeral">{prahar}</div>
      <div className="visualizer__prahar-clock">{clock}</div>
    </div>
  );
};

PraharClock.propTypes = {
  prahar: PropTypes.number.isRequired,
};

export default PraharClock;
