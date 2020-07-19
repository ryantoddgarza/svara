import React from 'react';
import context from '../../../constants/audioContext';
import Raga from '../../../constants/raga';
import ragaData from '../../../constants/ragaData.JSON';
import * as Random from '../../../constants/randomLogic';
import * as midi from '../../../constants/midi';
import VolumeSlider from '../../atoms/VolumeSlider';

const Patch = () => {
  let isPlaying = false;
  let startTime;
  let tempo = 45.0;
  let meter = 4;
  let measure = 0;
  let subdivision = 1;
  let currentSubdivision = 0;
  let masterVolume = 0.1;
  let lookahead = 25.0;
  let scheduleAheadTime = 0.1;
  let nextNoteTime = 0.0;
  let notesInQueue = [];
  let timerWorker = null;

  const midiNums = midi.noteNums;
  let tonic = 62;
  let scale = [];
  let scaleIndex = 0;

  const masterGainNode = context.createGain();
  masterGainNode.connect(context.destination);
  masterGainNode.gain.value = masterVolume;

  const getRaga = (ragaName) => {
    const raga = new Raga(midiNums, ragaName, tonic)
    scale = raga.avroh;
  }

  const wrapScale = () => {
    if (scaleIndex === scale.length) {
      scaleIndex = 0;
    }
  }

  const ascendScale = () => {
    scaleIndex++;
    wrapScale();

    return scale[scaleIndex];
  }

  const currentNote = () => {
    let note;
    const bool = Random.boolean();

    switch (bool) {
      case true:
        note = ascendScale();
        break;
      case false:
        note = scale[Random.integer(0, scale.length)];
        break;
    }

    console.log(note)
    return note;
  }

  const maxBeats = () => {
    const beats = (meter * subdivision);
    return beats;
  }

  const nextSubdivision = () => {
    const secondsPerBeat = 60.0 / tempo;
    nextNoteTime += (1 / subdivision) * secondsPerBeat; // add beat length to last beat time
    currentSubdivision++;

    // wrap to zero
    if (currentSubdivision == maxBeats()) {
      currentSubdivision = 0;
    }
  }

  const subdivideSlow = () => {
    const chance = Random.boolean();

    if (!chance) {
      subdivision = Random.fraction(4);
    } else {
      subdivision = Random.integerInclusive(1, 3);
    }

    return subdivision;
  }

  const subdivide = () => {
    switch (true) {
      case subdivision <= 1:
        subdivideSlow();
        break;
      case subdivision < 4:
        subdivision = Random.integer(1, 4)
        break;
      case subdivision >= 4:
        subdivision = Random.integer(2, 8)
        break;
    }

    return subdivision;
  }

  const scheduleNote = (beatNumber, time) => {
    // push the note on the queue, even if we're not playing.
    notesInQueue.push({ note: beatNumber, time: time });

    if (subdivision % 5 || 7 || 9 === 0) {
      if (beatNumber === 0) {
        subdivision = subdivide();
      }
    } else if (Random.integer(1, 100) % 3 === 0) {
      subdivision = subdivide();
    }

    // patch vca
    const vca1 = context.createGain();
    vca1.connect(masterGainNode);
    vca1.gain.value = 1;

    // carrier oscillator
    const osc1 = context.createOscillator();
    osc1.frequency.value = currentNote();
    osc1.connect(vca1);

    let attack = 0.1;
    let decay = 2.0;

    if (subdivision > 2) {
      decay = 0.5;
    }

    let noteLength = attack + decay;

    vca1.gain.setValueAtTime(0, context.currentTime);
    vca1.gain.linearRampToValueAtTime(1, context.currentTime + attack);
    vca1.gain.linearRampToValueAtTime(0, context.currentTime + noteLength);

    osc1.start(time);
    osc1.stop(time + noteLength);

    subOutput.value = subdivision;

    // increment measure
    if (beatNumber === 0) {
      measure++;
      measureOutput.value = measure;
    }
  }

  const scheduler = () => {
    while (nextNoteTime < context.currentTime + scheduleAheadTime ) {
      scheduleNote( currentSubdivision, nextNoteTime );
      nextSubdivision();
    }
  }

  const drone = () => {
    const gain1 = context.createGain();
    gain1.gain.value = 0.6;
    gain1.connect(masterGainNode);

    const osc1 = context.createOscillator();
    osc1.frequency.value = tonic * 2;
    osc1.connect(gain1);
    osc1.start();

    // const gain2 = context.createGain();
    // gain2.gain.value = 0.3;
    // gain2.connect(gain1.gain);

    // const osc2 = context.createOscillator();
    // osc2.type = 'triangle';
    // osc2.frequency.value = 0.051;
    // osc2.connect(gain2);
    // osc2.start();

    // const gain3 = context.createGain();
    // gain3.gain.value = 90;
    // gain3.connect(osc1.frequency);

    // const osc3 = context.createOscillator();
    // osc3.type = 'triangle';
    // osc3.frequency.value = tonic * 2;
    // osc3.connect(gain3);
    // osc3.start();
  }

  const play = () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
      // drone();
      context.resume();
      nextNoteTime = context.currentTime;
      timerWorker.postMessage("start");
      document.getElementById("play-icon").innerHTML = "pause";
    } else {
      context.suspend();
      timerWorker.postMessage("stop");
      document.getElementById("play-icon").innerHTML = "play_arrow";
    }
  }

  const init = () => {
    timerWorker = new Worker("/metronome.worker.js");

    timerWorker.onmessage = (e) => {
      if (e.data == "tick") {
        scheduler();
      } else {
        console.log("message: " + e.data);
      }
    };

    timerWorker.postMessage({"interval":lookahead});

    getRaga(ragaData['Miyan ki Todi']);
  }

  window.addEventListener("load", init );

  const handleTempoChange = (e) => {
    tempo = e.target.value;
    bpmOutput.value = bpmInput.value;
  }

  const handleMasterVolumeChange = (e) => {
    masterGainNode.gain.value = e.target.value / 100;
    masterVolume = e.target.value / 100;
  }

  return (
    <div className="metronome">
      <button onClick={ play }>
        <i id="play-icon">play_arrow</i>
      </button>
      <div>
        <output name="bpm" id="bpmOutput">{ tempo }</output>
        <span> bpm</span>
        <input type="range" name="bpm" id="bpmInput"
            defaultValue={ tempo } min="15" max="250"
            onInput={ handleTempoChange } />
      </div>
      <div>
        <output name="count" id="countOutput">{ meter }</output>
        <span> meter</span>
      </div>
      <div>
        <output name="measure" id="measureOutput">{ measure }</output>
        <span> measure</span>
      </div>
      <div>
        <output name="sub" id="subOutput">{ subdivision }</output>
        <span> subdivision</span>
      </div>
      <div>
        <span>Master Volume</span>
        <VolumeSlider default={ masterVolume } callback={ handleMasterVolumeChange } />
      </div>
    </div>
  )
}

export default Patch;
