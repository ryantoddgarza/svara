const ragas = require('./ragas.json');

function hrToPrahar(hr) {
  const hour = hr || new Date().getHours();

  switch (true) {
    case hour >= 6 && hour < 9:
      return 1;
    case hour >= 9 && hour < 12:
      return 2;
    case hour >= 12 && hour < 15:
      return 3;
    case hour >= 15 && hour < 18:
      return 4;
    case hour >= 18 && hour < 21:
      return 5;
    case hour >= 21 && hour < 24:
      return 6;
    case hour >= 0 && hour < 3:
      return 7;
    case hour >= 3 && hour < 6:
      return 8;
    default:
      return null;
  }
}

function filterByPrahar(prahar = hrToPrahar()) {
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

module.exports = { hrToPrahar, filterByPrahar };
