// random-js distributions at: https://www.npmjs.com/package/random-js#distributions
import { Random } from 'random-js';

const random = new Random();

random.fraction = (divisor) => 1 / (random.integer(1, divisor) + 1);

export default random;