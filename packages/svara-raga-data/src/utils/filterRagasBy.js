import { ragas } from '../data';

function filterRagasBy(field, val) {
  return ragas.filter((raga) => raga[field] === val);
}

export default filterRagasBy;
