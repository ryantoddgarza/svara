import { noteNums } from '../constants/midi';
import { prahar } from '../constants/raga';
import { random } from '../constants/randomEngine';

const availableRagas = prahar.getRagas();
export const selectedRaga = availableRagas[0]; // randomly gen

const generate = {
  tempo() {
    return random.integer(8, 15);
  },

  meter() {
    return random.integer(4, 16);
  },
};

export const nucleus = {
  tempo: generate.tempo(),
  meter: generate.meter(),
  tonic: 62,
  tonicToFreq() { return noteNums[this.tonic]; },
  ragaName: selectedRaga.name,
  prahar: selectedRaga.prahar,
};
