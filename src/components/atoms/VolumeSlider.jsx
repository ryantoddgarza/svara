import React from 'react';

const VolumeSlider = (props) => (
  <input
    type="range"
    min="0"
    max="100"
    defaultValue={props.default * 100}
    onInput={props.callback}
  />
);

export default VolumeSlider;
