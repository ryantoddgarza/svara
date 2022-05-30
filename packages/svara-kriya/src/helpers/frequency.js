function Frequency() {
  this.list = [];

  const A = 440;
  const N_SEMITONES = 12;

  for (let x = 0; x < 127; ++x) {
    const freq = 2 ** ((x - 69) / N_SEMITONES) * A;
    this.list.push(freq);
  }
}

const frequency = new Frequency();

export default frequency;
