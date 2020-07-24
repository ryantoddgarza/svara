// @param {array} midiNums - Standard MIDI note numbers
// @param {object} raga - Rules
// @param {number} root - MIDI note value

export default function Raga(midiNums, raga, root) {
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
    case hour >= 4 && hour < 7 :
      return 0
    case hour >= 7 && hour < 10 :
      return 1
    case hour >= 10 && hour < 13 :
      return 2
    case hour >= 13 && hour < 16 :
      return 3
    case hour >= 16 && hour < 19 :
      return 4
    case hour >= 19 && hour < 22 :
      return 5
    case hour >= 22 || hour < 1 :
      return 6
    case hour >= 1 && hour < 4 :
      return 7
    default:
      return null;
  }
}

