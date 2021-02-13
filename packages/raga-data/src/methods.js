const ragas = require('./ragas.json');
const { filterBy, hourToPrahar } = require('./utils');

function getPrahar(val) {
  return hourToPrahar(val);
}

function getRagas() {
  return ragas;
}

function getRagasByPrahar(prahar = hourToPrahar()) {
  return filterBy('prahar', prahar);
}

module.exports = { getPrahar, getRagas, getRagasByPrahar };
