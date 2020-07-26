import { noteNums } from '../constants/midi';
import { prahar } from '../constants/raga';

const availableRagas = prahar.getRagas();
const selectedRaga = availableRagas[0]; // randomly gen

const generate = {
  tempo: function() {
    return Math.round(Math.random() * 100);
  },
}

export const nucleus = {
  tempo: generate.tempo(),
  meter: 4,
  tonic: 62,
  tonicToFreq: function() { return noteNums[this.tonic] },
  ragaName: selectedRaga.name,
  prahar: selectedRaga.prahar,
};

console.log(nucleus.tempo)

// temporary for testing
// make into init random gen
// setTimeout(() => {
//   nucleus.tempo = 120;
//   nucleus.meter = 5;
// }, 4000);

