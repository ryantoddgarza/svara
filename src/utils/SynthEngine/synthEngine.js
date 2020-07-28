import { bloom } from '../../patches/Bloom';

const synthEngine = {
  isPlaying: false,

  timerWorker: null,

  lookahead: 25.0,

  scheduler() {
    bloom.scheduler();
  },

  play() {
    this.isPlaying = !this.isPlaying;
    bloom.play();
  },

  init() {
    this.timerWorker = new Worker('/metronome.worker.js');

    this.timerWorker.onmessage = function(e) {
      if (e.data === 'tick') {
        this.scheduler();
      }
    }.bind(this);

    this.timerWorker.postMessage({ interval: this.lookahead });
  },
};

export { synthEngine };
