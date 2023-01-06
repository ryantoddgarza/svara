// Number, Number -> Number
// Returns an index value within specified bounds given an index and a size.
function escapeIndex(index, size) {
  return ((index % size) + size) % size;
}

export default escapeIndex;
