// returns an integer within the bounds of an array's length.

export const wrap = (obj) => {
  let length = obj.arr.length;

  if (obj.pos >= length) {
    obj.pos = obj.pos % length;
    return obj.pos;
  }

  if (obj.pos < 0) {
    obj.pos = length + (obj.pos % length);
    return obj.pos;
  }

  return obj.pos;
}

// increments or decrements by reference the `pos` value of an object.
// @ {object} obj - should contain { arr: {array}, pos: {number} }
// @ {string} direction - increment or decrement the object's `pos` value
// @ {number} interval - amount to increment/decrement

export const stepThrough = (obj, direction, interval = 1) => {
  if (direction === 'inc') {
    obj.pos += interval;
  }

  if (direction === 'dec') {
    obj.pos -= interval;
  }

  wrap(obj);

  return obj.pos;
}

