import React, { Component } from 'react';
import { selectedRaga } from '~/patches/nucleus';
import { Analyser } from '~/constants/analyser';
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

class Visualizer extends Component {
  componentDidMount() {
    Analyser.init();
  }

  render() {
    return (
      <div className="visualizer">
        <PraharClock />
        <div className="visualizer__raga-info">
          <div className="visualizer__raga-name">
            {`raga ${selectedRaga.name}`}
          </div>
          <div className="visualizer__raga-detail">
            {`thaat · ${selectedRaga.thaat}`}
          </div>
          <div className="visualizer__raga-detail">
            {`vadi · ${indexToSvara(selectedRaga.vadi)}`}
          </div>
          <div className="visualizer__raga-detail">
            {`samvadi · ${indexToSvara(selectedRaga.samvadi)}`}
          </div>
          <div className="visualizer__raga-detail">
            {`prahar · ${selectedRaga.prahar}`}
          </div>
        </div>
        <canvas />
      </div>
    );
  }
}

export default Visualizer;
