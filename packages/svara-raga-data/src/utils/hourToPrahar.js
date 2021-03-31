import { praharas } from '../data';

function hourToPrahar(hour = new Date().getHours()) {
  return praharas.findIndex((list) => list.includes(hour)) + 1;
}

export default hourToPrahar;
