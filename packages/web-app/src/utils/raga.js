import ragas from '@svara/raga-data';

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

const prahar = {
  ragaData: ragas,

  getRagas() {
    return this.filteredRagas(this.ragaData);
  },

  getPrahar() {
    return this.hoursToPrahar();
  },

  filteredRagas(obj) {
    const filtered = [];
    const ragaNames = Object.keys(obj);

    ragaNames.forEach((name) => {
      const ragaObj = ragas[name];

      if (ragaObj.prahar === this.getPrahar()) {
        filtered.push(ragaObj);
      }
    });

    return filtered;
  },

  hoursToPrahar() {
    const hour = new Date().getHours();

    switch (true) {
      case hour >= 6 && hour < 9:
        return 1;
      case hour >= 9 && hour < 12:
        return 2;
      case hour >= 12 && hour < 15:
        return 3;
      case hour >= 15 && hour < 18:
        return 4;
      case hour >= 18 && hour < 21:
        return 5;
      case hour >= 21 && hour < 24:
        return 6;
      case hour >= 0 && hour < 3:
        return 7;
      case hour >= 3 && hour < 6:
        return 8;
      default:
        return null;
    }
  },
};

export {
  RagaScales,
  prahar,
};
