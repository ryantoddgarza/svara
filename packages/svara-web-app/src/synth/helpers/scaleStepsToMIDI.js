import stepToMIDI from './stepToMIDI';

function scaleStepsToMIDI(list, midiRoot) {
  return list.map((step) => stepToMIDI(step, midiRoot));
}

export default scaleStepsToMIDI;
