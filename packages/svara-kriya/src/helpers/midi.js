import frequency from './frequency';

function MIDI() {}

// Number -> Number
// Returns an equivalent frequency value given a MIDI value.
MIDI.prototype.toFreq = function toFrequency(n) {
  const freq = frequency.list[n];
  return freq;
};

// Array, Number [, Number ] -> Array
// Returns an array of MIDI values given a pitch class set array, a MIDI tonic
// value, and an optional octave count.
MIDI.prototype.fromPitchClass = function fromPitchClass(
  set,
  tonic,
  nOctaves = 1,
) {
  const midiVals = Array.from(set, (step) => tonic + step);

  if (nOctaves > 1) {
    for (let n = 1; n < nOctaves; n += 1) {
      midiVals.forEach((note) => {
        midiVals.push(note + 12 * n);
      });
    }
  }

  return midiVals;
};

const midi = new MIDI();

export default midi;
