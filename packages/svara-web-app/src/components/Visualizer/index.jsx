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
      <PraharClock prahar={raga.prahar} />
      <div className="raga-info">
        <div className="name">{`raga ${raga.name}`}</div>
        <div className="detail">{`thaat · ${raga.thaat.name}`}</div>
        <div className="detail">{`vadi · ${indexToSvara(raga.vadi)}`}</div>
        <div className="detail">
          {`samvadi · ${indexToSvara(raga.samvadi)}`}
        </div>
        <div className="detail">{`prahar · ${raga.prahar}`}</div>
      </div>
      <div className="analyzer">
        <canvas className="analyzer-canvas" />
      </div>
    </div>
  );
};

export default Visualizer;
