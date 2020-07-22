import React, { Component } from 'react';
import { useSynthEngine } from '../../../utils/SynthEngine';
import Controls from './atoms/Controls';

const LocalComponent = (props) => {
  return (
    <React.Fragment>
      local component props: {props.synthEngine}
    </React.Fragment>
  )
}
const WrappedComponent = useSynthEngine(LocalComponent);

class Player extends Component {
  render() {
    return (
      <div id="player">
        <WrappedComponent />
        <Controls start={ () => this.setState({isPlaying: true}) }
                  resume={ this.props.resume }
                  suspend={ this.props.suspend }/>
      </div>
    )
  }
}

export default Player;
