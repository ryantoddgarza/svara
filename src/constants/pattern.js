// returns a number within the range of an array's length
// @param {number} index - num to test
// @param {number} length - wrap to this length. passed in as `arr.length`
export const wrapArrayIndex = (index, length) => {
  if (index % length === 0) {
    index = 0;
    return index;
  }

  if (index < 0) {
    index = length + (index % length);
    return index;
  }

  if (index > length) {
    index = index % length;
    return index;
  }

  return index;
}

export const increment = (num, interval = 1) => {
  num += interval;
  return num;
}

export const decrement = (num, interval = 1) => {
  num -= interval;
  return num;
}

// modifies and object by reference.
// @param {object} - requires { pos: {num} }
// @param {function} callback - imcrement or decrement
// @param {number} interval - amount to inc/dec. passed to callback
export const stepThrough = (obj, callback, interval) => {
  obj.pos = callback(obj.pos, interval);
}
