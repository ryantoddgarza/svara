// @param {array} midiNums - Standard MIDI note numbers
// @param {object} raga - Rules
// @param {number} root - MIDI note value

export default function Raga(midiNums, raga, root) {
  let aarohArr = raga.aaroh.map((val) => {
    return root + val
  });

  this.aaroh = aarohArr.map((val) => {
    return midiNums[val];
  });

  let avrohArr = raga.avroh.map((val) => {
    return root + val
  });

  this.avroh = avrohArr.map((val) => {
    return midiNums[val];
  });
}
