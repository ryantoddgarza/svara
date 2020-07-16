export const makeNotes = () => {
  const midi = [];
  const a = 440; // a is 440 hz...

  for (let x = 0; x < 127; ++x) {
    midi.push(Math.pow(2, (x - 69) / 12) * a);
  }
  return midi;
}
