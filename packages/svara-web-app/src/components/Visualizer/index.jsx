import React, { useEffect } from 'react';
import { patch } from '@svara/kriya';
import Analyser from './analyser';
import Clock from '../Clock';

const Visualizer = () => {
  const {
    nucleus: {
      raga: { name, prahar, vadi, samvadi, thaat },
    },
  } = patch;

  const svara = {
    name: {
      short: [
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
      ],
    },
  };

  useEffect(() => {
    Analyser.init();

    return function cleanup() {
      Analyser.stop();
    };
  }, []);

  return (
    <div className="visualizer">
      <div className="prahar">
        <div className="numeral">{prahar}</div>
        <div className="clock">
          <Clock />
        </div>
      </div>
      <div className="raga-info">
        <div className="name">{`raga ${name}`}</div>
        <div className="detail">{`thaat · ${thaat.name}`}</div>
        <div className="detail">{`vadi · ${svara.name.short[vadi]}`}</div>
        <div className="detail">{`samvadi · ${svara.name.short[samvadi]}`}</div>
        <div className="detail">{`prahar · ${prahar}`}</div>
      </div>
      <div className="analyzer">
        <canvas className="analyzer-canvas" />
      </div>
    </div>
  );
};

export default Visualizer;
