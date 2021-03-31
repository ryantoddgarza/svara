import { ragas } from '../data';
import getRaga from './getRaga';

function getRagas() {
  return ragas.map((raga) => getRaga(raga.name));
}

export default getRagas;
