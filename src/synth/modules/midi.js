/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

const makeNotes = () => {
  const midi = [];
  const a = 440; // a is 440 hz...

  for (let x = 0; x < 127; ++x) {
    midi.push(2 ** ((x - 69) / 12) * a);
  }

  return midi;
};

// @return [num] - array of frequencies accessible by standard MIDI note numbers
const noteNums = makeNotes();

// TODO: name more clearly that this takes an array and not a single note value.
const midiToFreq = (midiNumArr) => midiNumArr.map((val) => noteNums[val]);

export {
  makeNotes,
  noteNums,
  midiToFreq,
};
