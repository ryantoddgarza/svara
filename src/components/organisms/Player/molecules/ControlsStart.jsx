import React, { useState, useEffect, Fragment } from 'react';
import { synthEngine } from '../../../../utils/SynthEngine';

const ControlsStart = () => {
  const [ragaName, setRagaName] = useState('')

  useEffect(() => {
    const ragaName = synthEngine.getMetadata().ragaName;

    setRagaName(ragaName);
  });

  return (
    <Fragment>
      <div className="Player__media-information">
        <span>{ ragaName }</span>
      </div>
    </Fragment>
  )
}

export default ControlsStart;

