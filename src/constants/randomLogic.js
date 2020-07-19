export const integer = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.floor(Math.random() * (max - min)) + min;

  return result;
}

export const integerInclusive = (min, max) => {
  const result = integer(min, max + 1);

  return result;
}

export const fraction = (divisor) => {
  const result = 1 / (integer(1, divisor) + 1);

  return result;
}

export const binary = () => {
  const result = Math.round(Math.random());

   return result;
}

export const boolean = () => {
  const binary = Math.round(Math.random());
  const result = binary ? true : false;

   return result;
}
