import React from 'react';
import { selectedRaga } from '../../../../patches/nucleus';

const RagaInfo = () => {
  return (
    <div className="visualizer__raga-info">
      <div className="visualizer__raga-name">{ 'raga ' + selectedRaga.name }</div>
      <div className="visualizer__raga-detail">{ 'thaat · ' + selectedRaga.thaat }</div>
      <div className="visualizer__raga-detail">{ 'vadi · ' + selectedRaga.vadi }</div>
      <div className="visualizer__raga-detail">{ 'samvadi · ' + selectedRaga.samvadi }</div>
      <div className="visualizer__raga-detail">{ 'prahar · ' + selectedRaga.prahar }</div>
    </div>
  )
};

export default RagaInfo;
