const wrap = (obj, min, max) => {
  min = 0;
  max = obj.pattern.length;

  if (obj.pos === max) {
    obj.pos = min;
  } else if (obj.pos === min) {
    obj.pos = max;
  } else return;
}

export const testInvalidIndex = (obj) => {
  const length = obj.pattern.length;

  switch (true) {
    case obj.pos > length:
      obj.pos = 0 + (obj.pos % length);
      break;
    case obj.pos < 0:
      obj.pos = length + obj.pos;
      break;
  }
}

export const stepThrough = (obj, dir, interval = 1) => {
  testInvalidIndex(obj);

  if (dir === 'inc') {
    obj.pos += interval;
    wrap(obj);
  } else if (dir === 'dec') {
    wrap(obj);
    obj.pos -= interval;
  } else return;

  return obj.pattern[obj.pos];
}

