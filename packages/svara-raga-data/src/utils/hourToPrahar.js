import { praharas } from '../data';

function hourToPrahar(hour = new Date().getHours()) {
  function findInTables(tab, val) {
    return Object.keys(tab).find((key) => tab[key].includes(val));
  }

  return parseFloat(findInTables(praharas, hour));
}

export default hourToPrahar;
