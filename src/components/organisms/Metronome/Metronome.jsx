// DEPRECATED: see Patch.jsx
import React, { Component } from 'react';
import VolumeSlider from './molecules/VolumeSlider';

const Metronome = () => {
  let audioContext = null;
  let isPlaying = false;
  let startTime;              // The start time of the entire sequence.
  let currentSubdivision    // What note is currently last scheduled?
  let tempo = 120.0;
  let meter = 4;
  let masterVolume = 0.3;
  let accentVolume = 1;
  let quarterVolume = 0.75;
  let eighthVolume = 0;
  let sixteenthVolume = 0;
  let tripletVolume = 0;
  let lookahead = 25.0;       // How frequently scheduling function is called (in milliseconds)
  let scheduleAheadTime = 0.1;    // How far ahead to schedule audio (sec)
                              // This is calculated from lookahead, and overlaps
                              // with next interval (in case the timer is late)
  let nextNoteTime = 0.0;     // when the next note is due.
  let notesInQueue = [];      // the notes that have been put into the web audio,
                              // and may or may not have played yet. {note, time}
  let timerWorker = null;     // The Web Worker used to fire timer messages

  const maxBeats = () => {
    const beats = (meter * 12);
    return beats;
  }

  const nextSubdivision = () => {
    const secondsPerBeat = 60.0 / tempo;
    nextNoteTime += (1 / 12) * secondsPerBeat;    // Add beat length to last beat time
    currentSubdivision++;    // Advance the beat number, wrap to zero

    if (currentSubdivision == maxBeats()) {
      currentSubdivision = 0;
    }
  }

  const calcVolume = (beatVolume) => {
    return (beatVolume * masterVolume);
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

    osc.connect(gainNode);
    gainNode.connect(vca1);

    let attack = 0.1;
    let decay = 0.15;
    let noteLength = attack + decay;

    vca1.gain.setValueAtTime(0, audioContext.currentTime);
    vca1.gain.linearRampToValueAtTime(1, audioContext.currentTime + attack);
    vca1.gain.linearRampToValueAtTime(0, audioContext.currentTime + noteLength);

    if (beatNumber % maxBeats() === 0) {
      if (accentVolume > 0.25) {
        osc.frequency.value = 880.0;
        gainNode.gain.value = calcVolume(accentVolume);
      } else {
        osc.frequency.value = 440.0;
        gainNode.gain.value = calcVolume(quarterVolume);
      }
    } else if (beatNumber % 12 === 0) {   // quarter notes = medium pitch
      osc.frequency.value = 440.0;
      gainNode.gain.value = calcVolume(quarterVolume);
    } else if (beatNumber % 6 === 0) {
      osc.frequency.value = 440.0;
      gainNode.gain.value = calcVolume(eighthVolume);
    } else if (beatNumber % 4 === 0) {
      osc.frequency.value = 329.63;
      gainNode.gain.value = calcVolume(tripletVolume);
    } else if (beatNumber % 3 === 0 ) {   // other 16th notes = low pitch
      osc.frequency.value = 220.0;
      gainNode.gain.value = calcVolume(sixteenthVolume);
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

  const handleEighthVolumeChange = (e) => {
    eighthVolume = e.target.value / 100;
  }

  const handleSixteenthVolumeChange = (e) => {
    sixteenthVolume = e.target.value / 100;
  }

  const handleTripletVolumeChange = (e) => {
    tripletVolume = e.target.value / 100;
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
            <h6>Tempo</h6>
              <h2 id="bpm">
              <output name="bpm" id="bpmOutput">{ tempo }</output>
              <span> bpm</span>
              </h2>
            <input type="range" name="bpm" id="bpmInput"
                defaultValue={ tempo } min="15" max="250"
                onInput={ handleTempoChange } />
          </div>
          <div>
            <h6>Meter</h6>
            <h2 id="bpm">
              <output name="count" id="countOutput">{ meter }</output>
              <span> counts</span>
            </h2>
            <input type="range" name="count" id="countInput"
                defaultValue={ meter } min="1" max="12"
                onInput={ handleMeterChange } />
          </div>
        </div>
        <div>
          <h6>Mixer</h6>
          <p>Master volume</p>
          <VolumeSlider default={ masterVolume } callback={ handleMasterVolumeChange } />

          <p>Accent</p>
          <VolumeSlider default={ accentVolume } callback={ handleAccentVolumeChange } />

          <p>Quarter Note</p>
          <VolumeSlider default={ quarterVolume } callback={ handleQuarterVolumeChange } />

          <p>Eighth Note</p>
          <VolumeSlider default={ eighthVolume } callback={ handleEighthVolumeChange } />

          <p>Sixteenth Note</p>
          <VolumeSlider default={ sixteenthVolume } callback={ handleSixteenthVolumeChange } />

          <p>Triplet</p>
          <VolumeSlider default={ tripletVolume } callback={ handleTripletVolumeChange } />
        </div>
      </main>
    </div>
  )
}

export default Metronome;
