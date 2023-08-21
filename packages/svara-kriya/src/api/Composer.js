import { getRagasByPrahar } from 'svara-raga-data';
import random from '../utils/random';

function Composer(opts = {}) {
  const d = {
    meter: {
      min: 4,
      max: 16,
    },
    tempo: {
      min: 8,
      max: 12,
    },
    tonic: 62,
  };

  this.meter = opts.meter || random.integer(d.meter.min, d.meter.max);
  this.raga = opts.raga || getRagasByPrahar()[0];
  this.tempo = opts.tempo || random.integer(d.tempo.min, d.tempo.max);
  this.tonic = opts.tonic || d.tonic;
}

// TODO: This shouldn't be a Composer method
Composer.prototype.genRandomScaleSteps = function generate(
  scale = [],
  length = 1,
) {
  const steps = [];

  function getRandomEl(arr) {
    return Math.floor(Math.random() * arr.length);
  }

  for (let i = 0; i < length; i += 1) {
    const step = getRandomEl(scale);
    steps.push(step);
  }

  return steps;
};

export default Composer;
