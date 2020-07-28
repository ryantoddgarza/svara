const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

context.suspend && context.suspend();

export default context;

export const systemOutput = (function() {
  const initVolume = 1;

  const gainNode = context.createGain();
  gainNode.connect(context.destination);
  gainNode.gain.value = initVolume;

  return {
    initVolume,
    gainNode,
    setGain(e) {
      gainNode.gain.value = e.target.value;
    },
  };
}());
