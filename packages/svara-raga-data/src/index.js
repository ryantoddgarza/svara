import { ragas } from './data';
import { filterBy, hourToPrahar } from './utils';

function getPrahar(val) {
  return hourToPrahar(val);
}

function getRagas() {
  return ragas;
}

function getRagasByPrahar(prahar = hourToPrahar()) {
  return filterBy('prahar', prahar);
}

export { getPrahar, getRagas, getRagasByPrahar };
