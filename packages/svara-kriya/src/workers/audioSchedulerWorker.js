let timerID = null;
let interval = 100;

function startTimer() {
  timerID = setInterval(() => {
    postMessage('tick');
  }, interval);
}

function stopTimer() {
  clearInterval(timerID);
  timerID = null;
}

function updateInterval(newInterval) {
  interval = newInterval;

  if (timerID) {
    clearInterval(timerID);
    startTimer();
  }
}

onmessage = (event) => {
  if (event.data === 'start') {
    startTimer();
  } else if (event.data.interval) {
    updateInterval(event.data.interval);
  } else if (event.data === 'stop') {
    stopTimer();
  }
};
