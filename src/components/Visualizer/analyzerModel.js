class AnalyzerModel {
  constructor() {
    this.observers = [];
  }

  addObserver(o) {
    this.observers.push(o);
  }

  notifyObservers() {
    this.observers.forEach((o) => {
      o.update(this);
    });
  }
}

const analyzerModel = new AnalyzerModel();

export default analyzerModel;
