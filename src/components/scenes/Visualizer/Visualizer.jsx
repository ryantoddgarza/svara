import React, { Component } from 'react';
import DynamicPrahar from './molecules/DynamicPrahar';
import AnalyzerCanvas from './molecules/AnalyzerCanvas';
import RagaInfo from './molecules/RagaInfo';
import { Analyser } from '../../../constants/analyser';

class Visualizer extends Component {
  componentDidMount() {
    Analyser.init();
  }

  // TODO: ticket #35 - unmount analyser

  render() {
    return (
      <div className="visualizer">
        <DynamicPrahar />
        <RagaInfo />
        <AnalyzerCanvas />
      </div>
    );
  }
}

export default Visualizer;
