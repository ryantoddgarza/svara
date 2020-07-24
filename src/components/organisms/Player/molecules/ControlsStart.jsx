import React, { useState, useEffect, Fragment } from 'react';
import getSynthEngine from '../../../../utils/SynthEngine/synthEngine';

const ControlsStart = () => {
  const [ragaName, setRagaName] = useState('')

  useEffect(() => {
    const ragaName = getSynthEngine.getMetadata().ragaName;

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

