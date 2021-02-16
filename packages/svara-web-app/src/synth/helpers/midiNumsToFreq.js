import midiToFreq from './midiToFreq';

function midiNumsToFreq(list) {
  return list.map((n) => midiToFreq(n));
}

export default midiNumsToFreq;
