import React, { useEffect } from 'react';
import { patch } from '@svara/kriya';
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
  const {
    nucleus: { raga },
  } = patch;

  useEffect(() => {
    Analyser.init();

    return function cleanup() {
      Analyser.stop();
    };
  }, []);

  return (
    <div className="visualizer">
      <div className="visualizer__inner">
        <PraharClock prahar={raga.prahar} />
        <div className="visualizer__raga-info">
          <div className="visualizer__raga-name">{`raga ${raga.name}`}</div>
          <div className="visualizer__raga-detail">
            {`thaat · ${raga.thaat.name}`}
          </div>
          <div className="visualizer__raga-detail">
            {`vadi · ${indexToSvara(raga.vadi)}`}
          </div>
          <div className="visualizer__raga-detail">
            {`samvadi · ${indexToSvara(raga.samvadi)}`}
          </div>
          <div className="visualizer__raga-detail">
            {`prahar · ${raga.prahar}`}
          </div>
        </div>
        <div className="visualizer__analyzer">
          <canvas />
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
