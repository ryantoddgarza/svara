const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

context.suspend && context.suspend();

const systemOutput = (function () {
  const initVolume = localStorage.getItem('volume') || 1;

  const gainNode = context.createGain();
  gainNode.connect(context.destination);
  gainNode.gain.value = initVolume;

  return {
    initVolume,
    gainNode,
    setGain(value) {
      gainNode.gain.value = value;
    },
  };
})();

export default { context, systemOutput };
