import React, { useState, useEffect, Fragment } from 'react';
import { nucleus } from '../../../../patches/nucleus';

const ControlsStart = () => {
  const [ragaName, setRagaName] = useState('')

  useEffect(() => {
    const ragaName = nucleus.ragaName; // TODO: make dynamic

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

