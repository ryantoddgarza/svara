import { getRagasByPrahar } from '@svara/raga-data';
import { random } from '../core/helpers';
import d from './defaults';

function Composer(opts = {}) {
  const meter = opts.meter || random.integer(d.meter.min, d.meter.max);
  const raga = opts.raga || getRagasByPrahar()[0];
  const tempo = opts.tempo || random.integer(d.tempo.min, d.tempo.max);
  const tonic = opts.tonic || d.tonic;

  return {
    meter,
    raga,
    tempo,
    tonic,
  };
}

export default Composer;
