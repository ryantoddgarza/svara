import { bloom } from './bloom';

export const synthEngine = {
  isPlaying: false,

  timerWorker: null,

  lookahead: 25.0,

  scheduler: function() {
    bloom.scheduler();
  },

  play: function() {
    this.isPlaying = !this.isPlaying;
    bloom.play();
  },

  init: function() {
    this.timerWorker = new Worker('/metronome.worker.js');

    this.timerWorker.onmessage = function(e) {
      if (e.data == 'tick') {
        this.scheduler();
      } else {
        console.log('message: ' + e.data);
      }
    }.bind(this);

    this.timerWorker.postMessage({ 'interval': this.lookahead });
  },
};

