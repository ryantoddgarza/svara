import React from 'react';
import DynamicPrahar from './molecules/DynamicPrahar';
import Analyzer from './molecules/Analyzer';
import RagaInfo from './molecules/RagaInfo';

const Visualizer = () => {
  return (
    <div className="visualizer">
      <DynamicPrahar />
      <RagaInfo />
      <Analyzer />
    </div>
  )
};

export default Visualizer;
