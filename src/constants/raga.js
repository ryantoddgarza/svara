// @param {array} midiNums - Standard MIDI note numbers
// @param {object} raga - Rules
// @param {number} root - MIDI note value

export function RagaScales(midiNums, raga, root) {
  this.aarohNum = raga.aaroh;
  this.avrohNum = raga.avroh;

  let aarohFreq = raga.aaroh.map((val) => {
    return root + val
  });

  this.aarohFreq = aarohFreq.map((val) => {
    return midiNums[val];
  });

  let avrohFreq = raga.avroh.map((val) => {
    return root + val
  });

  this.avrohFreq = avrohFreq.map((val) => {
    return midiNums[val];
  });
}

// time of day
export const prahar = () => {
  const hour = new Date().getHours();

  switch (true) {
    case hour >= 6 && hour < 9:
      return 1
    case hour >= 9 && hour < 12:
      return 2
    case hour >= 12 && hour < 15:
      return 3
    case hour >= 15 && hour < 18:
      return 4
    case hour >= 18 && hour < 21:
      return 5
    case hour >= 21:
      return 6
    case hour >= 0 && hour < 3:
      return 7
    case hour >= 3 && hour < 6:
      return 8
    default:
      return null;
  }
}

