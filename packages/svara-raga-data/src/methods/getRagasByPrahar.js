import { filterRagasBy, hourToPrahar } from '../utils';
import getRaga from './getRaga';

function getRagasByPrahar(prahar = hourToPrahar()) {
  return filterRagasBy('prahar', prahar).map((raga) => getRaga(raga.name));
}

export default getRagasByPrahar;
