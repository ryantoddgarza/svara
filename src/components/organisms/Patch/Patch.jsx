import React, { Component } from 'react';
import VolumeSlider from '../../atoms/VolumeSlider';
import * as midi from '../../../constants/midi';

let midiNum = midi.makeNotes();

// TODO: move out of file

// function ScaleMajor(root){
//   this.root = root;
//   this.third = root + 4;
//   this.fifth = root + 7;
//   this.octave = root * 2;
// }

const scale = [
  midiNum[60],
  midiNum[64],
  midiNum[67],
  midiNum[72],
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// END move out of file

const Patch = () => {
  // 1. start time of the entire sequence.
  // 2. what note is currently last scheduled?
  // 3. how frequently scheduling function is called (in milliseconds).
  // 4. how far ahead to schedule. This is calculated from lookahead, and overlaps audio (sec) with
  //    next interval (in case the timer is late).
  // 5. when the next note is due.
  // 6. notes that have been put into the web audio, and may or may not have played yet. {note, time}
  // 7. the Web Worker used to fire timer messages.
  let audioContext = null;
  let isPlaying = false;
  let startTime; // 1
  let currentSubdivision // 2
  let tempo = 62.0;
  let meter = 4;
  let masterVolume = 0.3;
  let quarterVolume = 0.75;
  let accentVolume = 1;
  let subdivisions = 4;
  let lookahead = 25.0; // 3
  let scheduleAheadTime = 0.1; // 4
  let nextNoteTime = 0.0; // 5
  let notesInQueue = []; // 6
  let timerWorker = null; // 7

  const maxBeats = () => {
    const beats = (meter * subdivisions);
    return beats;
  }

  const nextSubdivision = () => {
    const secondsPerBeat = 60.0 / tempo;
    nextNoteTime += (1 / subdivisions) * secondsPerBeat; // add beat length to last beat time
    currentSubdivision++; // advance the beat number, wrap to zero

    if (currentSubdivision == maxBeats()) {
      currentSubdivision = 0;
    }
  }

  const calcVolume = (beatVolume) => {
    return (beatVolume * masterVolume);
  }

  let currentNote = () => {
    let note = scale[getRandomInt(0, scale.length)];
    return note;
  }

  const scheduleNote = (beatNumber, time) => {
    // push the note on the queue, even if we're not playing.
    notesInQueue.push({ note: beatNumber, time: time });

    // carrier oscillator
    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // note length envelope vca
    const vca1 = audioContext.createGain();
    vca1.connect(audioContext.destination);

    osc.frequency.value = currentNote();
    osc.connect(gainNode);
    gainNode.gain.value = calcVolume(quarterVolume);
    gainNode.connect(vca1);

    let attack = 0.1;
    let decay = 0.15;
    let noteLength = attack + decay;

    vca1.gain.setValueAtTime(0, audioContext.currentTime);
    vca1.gain.linearRampToValueAtTime(1, audioContext.currentTime + attack);
    vca1.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteLength);


    if (beatNumber % maxBeats() === 0) {
      gainNode.gain.value = calcVolume(accentVolume);
    } else if (beatNumber % subdivisions === 0) {   // quarter notes = medium pitch
      gainNode.gain.value = calcVolume(quarterVolume);
    } else {
      gainNode.gain.value = 0;   // keep the remaining twelvelet notes inaudible
    }

    osc.start(time);
    osc.stop(time + noteLength);
  }

  const scheduler = () => {
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
      scheduleNote( currentSubdivision, nextNoteTime );
      nextSubdivision();
    }
  }

  const play = () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
      currentSubdivision = 0;
      nextNoteTime = audioContext.currentTime;
      timerWorker.postMessage("start");
      document.getElementById("play-icon").innerHTML = "pause";
    } else {
      timerWorker.postMessage("stop");
      document.getElementById("play-icon").innerHTML = "play_arrow";
    }
  }

  const init = () => {
    audioContext = new AudioContext();
    timerWorker = new Worker("/metronome.worker.js");

    timerWorker.onmessage = (e) => {
      if (e.data == "tick") {
        scheduler();
      } else {
        console.log("message: " + e.data);
      }
    };

    timerWorker.postMessage({"interval":lookahead});
  }

  window.addEventListener("load", init );

  const handleTempoChange = (e) => {
    tempo = e.target.value;
    bpmOutput.value = bpmInput.value;
  }

  const handleMeterChange = (e) => {
    meter = e.target.value;
    countOutput.value = countInput.value;
  }

  const handleMasterVolumeChange = (e) => {
    masterVolume = e.target.value / 100;
  }

  const handleAccentVolumeChange = (e) => {
    accentVolume = e.target.value / 100;
  }

  const handleQuarterVolumeChange = (e) => {
    quarterVolume = e.target.value / 100;
  }

  return (
    <div className="metronome">
      <header>
        <button id="add" onClick={ play }>
          <i id="play-icon">play_arrow</i>
        </button>
      </header>
      <main>
        <div>
          <div>
              <h2 id="bpm">
              <output name="bpm" id="bpmOutput">{ tempo }</output>
              <span> bpm</span>
              </h2>
            <input type="range" name="bpm" id="bpmInput"
                defaultValue={ tempo } min="15" max="250"
                onInput={ handleTempoChange } />
          </div>
          <div>
            <h2 id="bpm">
              <output name="count" id="countOutput">{ meter }</output>
              <span> counts</span>
            </h2>
            <input type="range" name="count" id="countInput"
                defaultValue={ meter } min="1" max={ subdivisions }
                onInput={ handleMeterChange } />
          </div>
        </div>
        <div>
          <h6>Mixer</h6>
          <p>Master Volume</p>
          <VolumeSlider default={ masterVolume } callback={ handleMasterVolumeChange } />
          <p>Accent</p>
          <VolumeSlider default={ accentVolume } callback={ handleAccentVolumeChange } />
          <p>Quarter Note</p>
          <VolumeSlider default={ quarterVolume } callback={ handleQuarterVolumeChange } />
        </div>
      </main>
    </div>
  )
}

export default Patch;
