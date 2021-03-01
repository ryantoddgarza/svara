import { scaleStepsToMIDI } from '../helpers';

function PitchClassSet(opts = {}) {
  const tonic = opts.tonic || 60;
  const scaleSteps = opts.scaleSteps || [0, 2, 4, 5, 7, 9, 11];
  const octaves = opts.octaves || 1;
  const arr = []; // possible midi num list

  function parseOctaves() {
    const oneOctMIDI = scaleStepsToMIDI(scaleSteps, tonic);
    const multOctMIDI = [];

    if (octaves === 1) {
      return oneOctMIDI;
    }

    for (let nOct = 0; nOct < octaves; nOct += 1) {
      oneOctMIDI.forEach((note) => {
        multOctMIDI.push(note + 12 * nOct);
      });
    }

    return multOctMIDI;
  }

  return {
    range: parseOctaves(),
    arr,
    pos: 0,

    getCurrentPitch() {
      return this.arr[this.pos];
    },

    setNextPitch(interval) {
      const modN = (n, mod) => n % mod;
      this.pos = modN(this.pos + interval, this.arr.length);
    },
  };
}

export default PitchClassSet;
