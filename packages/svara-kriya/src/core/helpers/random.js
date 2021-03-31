// Read about the random-js distributions at:
// https://www.npmjs.com/package/random-js#distributions
import { Random } from 'random-js';

const random = new Random();

random.fraction = (divisor) => 1 / (random.integer(1, divisor) + 1);

random.array = (opts = {}) => {
  const length = opts.length || 0;
  const min = opts.min || 0;
  const max = opts.max || 1;

  return Array.from({ length }, () => random.integer(min, max));
};

export default random;
