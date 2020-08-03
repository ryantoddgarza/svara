import React, { Component } from 'react';
import { selectedRaga } from '../../../../patches/nucleus';

class DynamicPrahar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString('it-IT'),
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000,
    );
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
        <div className="visualizer__prahar-numeral">{ selectedRaga.prahar }</div>
        <div className="visualizer__prahar-clock">{ this.state.time }</div>
      </div>
    );
  }
}

export default DynamicPrahar;
