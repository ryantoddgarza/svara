/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
//
// returns a number within the range of an array's length
// @param {number} index - num to test
// @param {number} length - wrap to this length. passed in as `arr.length`
const wrapArrayIndex = (index, length) => {
  let wrappedIndex;

  if (index % length === 0) {
    wrappedIndex = 0;
    return wrappedIndex;
  }

  if (index < 0) {
    wrappedIndex = length + (index % length);
    return wrappedIndex;
  }

  if (index > length) {
    wrappedIndex = index % length;
    return wrappedIndex;
  }

  return index;
};

const increment = (num, interval = 1) => {
  num += interval;
  return num;
};

const decrement = (num, interval = 1) => {
  num -= interval;
  return num;
};

// modifies and object by reference.
// @param {object} - requires { pos: {num} }
// @param {function} callback - imcrement or decrement
// @param {number} interval - amount to inc/dec. passed to callback
const stepThrough = (obj, callback, interval) => {
  obj.pos = callback(obj.pos, interval);
};

const fibonacci = (n) => {
  const fibArr = [0, 1];

  for (let i = 2; i < n + 1; i++) {
    fibArr.push(fibArr[i - 2] + fibArr[i - 1]);
  }

  return fibArr[n];
};

export {
  wrapArrayIndex,
  increment,
  decrement,
  stepThrough,
  fibonacci,
}
