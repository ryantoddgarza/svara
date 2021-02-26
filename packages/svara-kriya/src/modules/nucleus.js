import { getRagasByPrahar } from '@svara/raga-data';
import random from './random';

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
  raga: getRagasByPrahar()[0],
};

export default nucleus;
