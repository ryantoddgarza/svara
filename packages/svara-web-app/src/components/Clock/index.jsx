import React, { useState, useEffect } from 'react';

const Clock = () => {
  const getCurrentTime = () => new Date().toLocaleTimeString('en-GB');
  const [clock, setClock] = useState(getCurrentTime);
  let timer;

  useEffect(() => {
    timer = setInterval(() => {
      setClock(getCurrentTime);
    }, 1000);

    return function cleanup() {
      clearInterval(timer);
      timer = null;
    };
  }, []);

  return <div>{clock}</div>;
};

export default Clock;
