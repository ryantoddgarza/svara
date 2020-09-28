import React, { Component } from 'react';
import nucleus from '~/synth/modules/nucleus';

class PraharClock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString('it-IT'),
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: new Date().toLocaleTimeString('it-IT'),
    });
  }

  render() {
    return (
      <div className="visualizer__prahar">
        <div className="visualizer__prahar-numeral">{nucleus.raga.prahar}</div>
        <div className="visualizer__prahar-clock">{this.state.time}</div>
      </div>
    );
  }
}

export default PraharClock;
