const ragas = require('./ragas.json');
const { hrToPrahar, filterByPrahar } = require('./utils');

function getPrahar(val) {
  return hrToPrahar(val);
}

function getRagas() {
  return ragas;
}

function getRagasByPrahar(prahar) {
  return filterByPrahar(prahar);
}

module.exports = { getRagas, getPrahar, getRagasByPrahar };
