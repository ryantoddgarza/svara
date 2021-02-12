// @param {array} midiNums - Standard MIDI note numbers
// @param {object} raga - Rules
// @param {number} rootNum - MIDI note value
function RagaScales(midiNums, raga, rootNum) {
  this.aarohNum = raga.aaroh;
  this.avrohNum = raga.avroh;

  // TODO: ticket #29 - fix this major naming fail.
  // tell tomorrow ryan to ask yesterday ryan what he meant.
  const aarohFreq = raga.aaroh.map((val) => rootNum + val);
  this.aarohFreq = aarohFreq.map((val) => midiNums[val]);

  const avrohFreq = raga.avroh.map((val) => rootNum + val);
  this.avrohFreq = avrohFreq.map((val) => midiNums[val]);
}

export { RagaScales };
