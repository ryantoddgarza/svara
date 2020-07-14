import React, { Component } from 'react';
import Controls from './molecules/Controls';

class Player extends Component {
  state = {
    isActive: false,
    isPlaying: false
  }

  render() {
    return (
      <div id="player">
        <Controls start={ this.props.start }
                  resume={ this.props.resume }
                  suspend={ this.props.suspend }/>
      </div>
    )
  }
}

export default Player;
