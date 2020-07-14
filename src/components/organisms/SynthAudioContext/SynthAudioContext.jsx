import React, { Component } from 'react';
import Player from '../Player';

// utilities TODO: extract
const minMax = (value, min = 0, max = 1) => {
  return Math.min(max, Math.max(min, value));
};

// patches TODO: extract
const Patch1 = (props) => {
  let tonic = 55;

  // master section
  const output = props.audioContext.destination;

  const masterGain = props.audioContext.createGain();
  masterGain.gain.value = minMax(0.2);
  masterGain.connect(output);

  // patch
  const gain1 = props.audioContext.createGain();
  gain1.gain.value = 0.5;
  gain1.connect(masterGain);

  const osc1 = props.audioContext.createOscillator();
  osc1.frequency.value = tonic;
  osc1.connect(gain1);
  osc1.start();

  const gain2 = props.audioContext.createGain();
  gain2.gain.value = 0.2;
  gain2.connect(gain1.gain);

  const osc2 = props.audioContext.createOscillator();
  osc2.type = 'triangle';
  osc2.frequency.value = 0.051;
  osc2.connect(gain2);
  osc2.start();

  const gain3 = props.audioContext.createGain();
  gain3.gain.value = 90;
  gain3.connect(osc1.frequency);

  const osc3 = props.audioContext.createOscillator();
  osc3.type = 'triangle';
  osc3.frequency.value = tonic * 2.007;
  osc3.connect(gain3);
  osc3.start();

  return (
    <div id="patch1"></div>
  )
};

// logic TODO: extract
  // let fibArr = [0, 1];
  // const fib = (n) => {
  //   for (let i = 2; i < n + 1; i++) {
  //     fibArr.push(fibArr[i - 2] + fibArr[i - 1]);
  //     console.log(fibArr);
  //   }
  //  return fibArr[n]
  // }

  // fib(2);

  // fibArr.map((num, i) => {
  //   setTimeout(() => {
  //     osc1.frequency.value = tonic + num;
  //   }, i * 2000);
  // });

const SynthAudioContext = () => {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  let audioContext;
  let initAudioContext = false;
  initAudioContext ? audioContext = new AudioContext() : null;

  if (!audioContext) {
    console.warn('Please start the AudioContext');
    return null;
  }

  const qux = () => console.log('Feature not yet available')

  return (
    <div id="SynthAudioContext">
      <Patch1 audioContext={ audioContext } />
      <Player start={ qux }
              resume={ () => audioContext.resume() }
              suspend={ () => audioContext.suspend() }/>
    </div>
  )
};

export default SynthAudioContext;
