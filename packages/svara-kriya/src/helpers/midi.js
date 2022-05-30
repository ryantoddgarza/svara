import frequency from './frequency';

function MIDI() {}

MIDI.prototype.toFreq = function toFrequency(n) {
  return frequency.list[n];
};

const midi = new MIDI();

export default midi;
