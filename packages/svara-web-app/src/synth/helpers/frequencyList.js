/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

function frequencyList() {
  const frequencies = [];
  const a = 440; // tune

  for (let x = 0; x < 127; ++x) {
    const freq = 2 ** ((x - 69) / 12) * a;
    frequencies.push(freq);
  }

  return frequencies;
}

export default frequencyList();
