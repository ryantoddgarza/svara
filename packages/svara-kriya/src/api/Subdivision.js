import random from '../utils/random';

function Subdivision(opts = {}) {
  const d = {
    value: 1,
    meter: 4,
  };

  this.value = opts.value || d.value;
  this.current = 0;
  this.meter = opts.meter || d.meter;
}

Subdivision.prototype.next = function next(callback) {
  this.current += 1;

  if (typeof callback === 'function' && callback()) {
    callback();
  }

  if (this.isMax()) {
    this.reset();
  }
};

Subdivision.prototype.reset = function reset() {
  this.current = 0;
};

Subdivision.prototype.new = function newDivision(val) {
  const getRandomValue = (test) => {
    switch (true) {
      case test <= 1: // Is slow
        return random.bool() ? random.integer(1, 3) : 1 / random.integer(1, 4);
      case test < 4: // Is medium
        return random.integer(1, 4);
      case test >= 4: // Is fast
        return random.integer(2, 6);
      default:
        return d.value;
    }
  };

  this.value = val || getRandomValue(this.value);
};

Subdivision.prototype.newQuantizedToDownbeat = function quantizedToDB(subVal) {
  const isDownbeat = this.current === 0;
  const isSubValMultiple = this.value % subVal === 0;

  if (isDownbeat && isSubValMultiple) {
    this.new();
  }
};

Subdivision.prototype.getMaxBeats = function getMaxBeats() {
  return this.meter * this.value;
};

Subdivision.prototype.isMax = function isMax() {
  return this.current === this.getMaxBeats();
};

export default Subdivision;
