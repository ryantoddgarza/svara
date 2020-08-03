import React from 'react';
import { selectedRaga } from '../../../../patches/nucleus';

const RagaInfo = () => {
  const svaraNames = ['sa', 're', 're', 'ga', 'ga', 'ma', 'ma', 'pa', 'dha', 'dha', 'ni', 'ni'];

  const indexToSvara = (i) => {
    const svara = svaraNames[i];

    return svara;
  };

  return (
    <div className="visualizer__raga-info">
      <div className="visualizer__raga-name">{ `raga ${selectedRaga.name}` }</div>
      <div className="visualizer__raga-detail">{ `thaat · ${selectedRaga.thaat}` }</div>
      <div className="visualizer__raga-detail">{ `vadi · ${indexToSvara(selectedRaga.vadi)}` }</div>
      <div className="visualizer__raga-detail">{ `samvadi · ${indexToSvara(selectedRaga.samvadi)}` }</div>
      <div className="visualizer__raga-detail">{ `prahar · ${selectedRaga.prahar}` }</div>
    </div>
  );
};

export default RagaInfo;
