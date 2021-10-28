import React, { useEffect, useState } from 'react';
import patch from '@svara-kriya';
import Analyser from 'svara-analyser-chakra';
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

  const [isConnected, setIsConnected] = useState(false);

  const connectAnalyzer = () => {
    patch.systemOutput.gain.connect(Analyser.analyser);
    setIsConnected(true);
  };

  useEffect(() => {
    Analyser.init(patch.context);
    connectAnalyzer();

    return function cleanup() {
      Analyser.stop();
      setIsConnected(false);
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
