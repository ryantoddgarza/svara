// random-js distributions at: https://www.npmjs.com/package/random-js#distributions
import { Random } from 'random-js';

export const random = new Random();

random.fraction = function(divisor) {
  return 1 / (random.integer(1, divisor) + 1);
};
