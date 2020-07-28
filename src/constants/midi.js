/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

export const makeNotes = () => {
  const midi = [];
  const a = 440; // a is 440 hz...

  for (let x = 0; x < 127; ++x) {
    midi.push(2 ** ((x - 69) / 12) * a);
  }
  return midi;
};

// @return [num] - array of frequencies accessible by standard MIDI note numbers
export const noteNums = makeNotes();
