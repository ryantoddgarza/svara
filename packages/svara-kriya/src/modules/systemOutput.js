import patch from '../patch';

const systemOutput = (function () {
  const initVolume = localStorage.getItem('volume') || 1;

  const gainNode = patch.context.createGain();
  gainNode.connect(patch.context.destination);
  gainNode.gain.value = initVolume;

  return {
    initVolume,
    gainNode,
    setGain(value) {
      gainNode.gain.value = value;
    },
  };
})();

export default systemOutput;
