const ragas = require('./ragas.json');
const { hourToPrahar, filterByPrahar } = require('./utils');

function getPrahar(val) {
  return hourToPrahar(val);
}

function getRagas() {
  return ragas;
}

function getRagasByPrahar(prahar) {
  return filterByPrahar(prahar);
}

module.exports = { getRagas, getPrahar, getRagasByPrahar };
