import { Bloom } from '../../patches/Bloom';

const synthEngine = {
  isPlaying: false,

  timerWorker: null,

  lookahead: 25.0,

  scheduler() {
    Bloom.scheduler();
  },

  play() {
    this.isPlaying = !this.isPlaying;
    Bloom.play();
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
