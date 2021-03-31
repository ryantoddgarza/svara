import { ragas } from '../data';
import { joinThaat } from '../utils';

function getRaga(name) {
  const selRaga = ragas.find(({ name: ragaName }) => ragaName === name);
  const raga = joinThaat(selRaga);

  return raga;
}

export default getRaga;
