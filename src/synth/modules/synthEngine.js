import Bloom from '~/synth/patches/Bloom';

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

    this.timerWorker.onmessage = (e) => {
      if (e.data === 'tick') {
        this.scheduler();
      }
    };

    this.timerWorker.postMessage({ interval: this.lookahead });
  },
};

export default synthEngine;
