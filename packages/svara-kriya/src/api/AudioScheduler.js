class AudioScheduler {
  #scheduler;

  #worker;

  #isRunning;

  constructor(scheduler) {
    this.#worker = new Worker('/audioScheduler.worker.js');
    this.#scheduler = scheduler;
    this.#isRunning = false;
    this.lookahead = 25.0;

    this.#setupWorker();
  }

  #setupWorker() {
    this.worker.onmessage = (e) => {
      if (e.data === 'tick') {
        this.#scheduler();
      }
    };

    this.worker.postMessage({ interval: this.lookahead });
  }

  get worker() {
    return this.#worker;
  }

  get isRunning() {
    return this.#isRunning;
  }

  start() {
    this.worker.postMessage('start');
    this.#isRunning = true;
  }

  stop() {
    this.worker.postMessage('stop');
    this.#isRunning = false;
  }
}

export default AudioScheduler;
