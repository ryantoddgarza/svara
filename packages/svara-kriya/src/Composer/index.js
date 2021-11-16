import { getRagasByPrahar } from 'svara-raga-data';
import { random } from '../core/helpers';
import d from './defaults';

function Composer(opts = {}) {
  this.meter = opts.meter || random.integer(d.meter.min, d.meter.max);
  this.raga = opts.raga || getRagasByPrahar()[0];
  this.tempo = opts.tempo || random.integer(d.tempo.min, d.tempo.max);
  this.tonic = opts.tonic || d.tonic;
}

Composer.prototype = {
  getRandomScaleSteps(opts = {}) {
    // TODO: scale needs to change based on previous note
    const scale = opts.scale || this.raga.avroh;
    const length = {
      min: opts.minLength || 6,
      max: opts.maxLength || 8,
    };

    const indexOpts = {
      length: opts.length || random.integer(length.min, length.max),
      max: scale.length - 1,
    };
    const randomIndices = random.array(indexOpts);
    const steps = randomIndices.map((i) => scale[i]);

    return steps;
  },
};

export default Composer;
