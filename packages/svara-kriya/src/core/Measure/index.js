function Measure() {
  return {
    current: 0,

    increment() {
      this.current += 1;
    },
  };
}

export default Measure;
