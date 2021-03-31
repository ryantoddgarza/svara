import { filterRagasBy, hourToPrahar } from '../utils';

function getRagasByPrahar(prahar = hourToPrahar()) {
  return filterRagasBy('prahar', prahar);
}

export default getRagasByPrahar;
