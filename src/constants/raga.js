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
