import React from 'react';

const Controls = (props) => {
  return (
    <div className="player__controls">
      <button onClick={ props.start }>start</button>
      <button onClick={ props.resume }>resume</button>
      <button onClick={ props.suspend }>suspend</button>
    </div>
  )
}

export default Controls;
