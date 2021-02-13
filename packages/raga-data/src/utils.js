const ragas = require('./ragas.json');
const praharas = require('./praharas');

function hourToPrahar(hour = new Date().getHours()) {
  function findInTables(tab, val) {
    return Object.keys(tab).find((key) => tab[key].includes(val));
  }

  return parseFloat(findInTables(praharas, hour));
}

function filterByPrahar(prahar = hourToPrahar()) {
  const filtered = [];
  const ragaNames = Object.keys(ragas);

  ragaNames.forEach((name) => {
    const ragaObj = ragas[name];

    if (ragaObj.prahar === prahar) {
      filtered.push(ragaObj);
    }
  });

  return filtered;
}

module.exports = { hourToPrahar, filterByPrahar };
