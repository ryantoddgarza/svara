import React, { useState, useEffect } from 'react';
import { nucleus } from '~/patches/nucleus';

const ControlsStart = () => {
  const [ragaName, setRagaName] = useState('');

  useEffect(() => {
    const selectedRagaName = nucleus.ragaName; // TODO: make dynamic
    setRagaName(selectedRagaName);
  });

  return (
    <div className="player__start">
      <div className="player__media-info">
        <span>{ragaName}</span>
      </div>
    </div>
  );
};

export default ControlsStart;
