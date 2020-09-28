import { noteNums } from '~/synth/modules/midi';
import { prahar } from '~/utils/raga';
import random from '~/synth/modules/random';

const generate = {
  tempo() {
    return random.integer(8, 15);
  },

  meter() {
    return random.integer(4, 16);
  },
};

const nucleus = {
  tempo: generate.tempo(),
  meter: generate.meter(),
  tonic: 62,
  tonicToFreq() {
    return noteNums[this.tonic];
  },
  raga: prahar.getRagas()[0],
};

export default nucleus;
