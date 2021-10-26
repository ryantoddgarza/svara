import d from './defaults';

function PitchClassSet(opts = {}) {
  const tonic = opts.tonic || d.tonic;
  const scaleSteps = opts.scaleSteps || d.scaleSteps;
  const octaves = opts.octaves || d.octaves;
  const arr = []; // possible midi num list

  function parseOctaves() {
    const oneOctMIDI = Array.from(scaleSteps, (step) => tonic + step);
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
