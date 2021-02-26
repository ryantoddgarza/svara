import { random } from '../../modules';
import d from './defaults';

function Subdivision(opts = {}) {
  return {
    current: 0,
    value: opts.value || d.value,
    meter: opts.meter || d.meter,

    next(callback) {
      this.current += 1;

      if (typeof callback === 'function' && callback()) {
        callback();
      }

      if (this.isMax()) {
        this.reset();
      }
    },

    reset() {
      this.current = 0;
    },

    new(val) {
      this.value = val || this.conditionallyRender();
    },

    newQuantizedToDownbeat(subVal) {
      const isDownbeat = this.current === 0;
      const isSubValMultiple = this.value % subVal === 0;

      if (isDownbeat && isSubValMultiple) {
        this.new();
      }
    },

    getMaxBeats() {
      return this.meter * this.value;
    },

    isMax() {
      return this.current === this.getMaxBeats();
    },

    conditionallyRender() {
      let rendered;

      function Query(condition, render) {
        return {
          condition,
          render,
        };
      }

      const isSlow = new Query(this.value <= 1, () =>
        random.bool() ? random.integer(1, 3) : random.fraction(4),
      );

      const isMedium = new Query(this.value > 1 && this.value < 4, () =>
        random.integer(1, 4),
      );

      const isFast = new Query(this.value >= 4, () => random.integer(2, 6));

      const list = [isSlow, isMedium, isFast];
      list.forEach((query) => {
        if (query.condition) {
          rendered = query.render();
        }
      });

      return rendered;
    },
  };
}

export default Subdivision;
