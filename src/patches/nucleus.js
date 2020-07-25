import { noteNums } from '../constants/midi';

export const nucleus = {
  tempo: 90,
  meter: 4,
  tonic: 62,
  tonicToFreq: function() { return noteNums[this.tonic] },
  ragaName: 'miyan ki todi',
  prahar: 1, // gen based on prahar
};

// temporary for testing
// make into init random gen
// setTimeout(() => {
//   nucleus.tempo = 120;
//   nucleus.meter = 5;
// }, 4000);

