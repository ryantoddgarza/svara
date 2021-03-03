import { midiNumsToFreq, scaleStepsToMIDI } from '../core/helpers';

function RagaPitchTables(raga, midiRoot) {
  const aarohScaleSteps = raga.aaroh;
  const avrohScaleSteps = raga.avroh;

  const aarohMIDINums = scaleStepsToMIDI(raga.aaroh, midiRoot);
  const avrohMIDINums = scaleStepsToMIDI(raga.avroh, midiRoot);

  const aarohFrequencies = midiNumsToFreq(aarohMIDINums);
  const avrohFrequencies = midiNumsToFreq(avrohMIDINums);

  return {
    aarohScaleSteps,
    avrohScaleSteps,
    aarohMIDINums,
    avrohMIDINums,
    aarohFrequencies,
    avrohFrequencies,
  };
}

export default RagaPitchTables;
