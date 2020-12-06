import React, { useEffect } from 'react';
import nucleus from '~/synth/modules/nucleus';
import Analyser from './analyser';
import PraharClock from '~/components/PraharClock';

const svaraNames = [
  'sa',
  're',
  're',
  'ga',
  'ga',
  'ma',
  'ma',
  'pa',
  'dha',
  'dha',
  'ni',
  'ni',
];

const indexToSvara = (i) => svaraNames[i];

const Visualizer = () => {
  useEffect(() => {
    Analyser.init();
  }, []);

  return (
    <div className="visualizer">
      <PraharClock prahar={nucleus.raga.prahar} />
      <div className="visualizer__raga-info">
        <div className="visualizer__raga-name">
          {`raga ${nucleus.raga.name}`}
        </div>
        <div className="visualizer__raga-detail">
          {`thaat · ${nucleus.raga.thaat}`}
        </div>
        <div className="visualizer__raga-detail">
          {`vadi · ${indexToSvara(nucleus.raga.vadi)}`}
        </div>
        <div className="visualizer__raga-detail">
          {`samvadi · ${indexToSvara(nucleus.raga.samvadi)}`}
        </div>
        <div className="visualizer__raga-detail">
          {`prahar · ${nucleus.raga.prahar}`}
        </div>
      </div>
      <canvas />
    </div>
  );
};

export default Visualizer;
