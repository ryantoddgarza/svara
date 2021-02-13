const ragas = require('./ragas.json');
const praharas = require('./praharas');

function hourToPrahar(hour = new Date().getHours()) {
  function findInTables(tab, val) {
    return Object.keys(tab).find((key) => tab[key].includes(val));
  }

  return parseFloat(findInTables(praharas, hour));
}

function filterBy(field, val) {
  return ragas.filter((raga) => raga[field] === val);
}

module.exports = { filterBy, hourToPrahar };
