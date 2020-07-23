import context from '../WebAudio/audioContext';
import * as MIDI from '../../constants/midi';
import * as Pattern from '../../constants/pattern';
import Raga from '../../constants/raga';
import ragas from '../../constants/ragas.json';

// export class SynthEngine {
//   play() {
//     console.log('fooClass');
//   }
// }

const getSynthEngine = (function() {
  const midiNums = MIDI.noteNums;

  let timerWorker = null;
  let lookahead = 25.0;
  let startTime;
  let scheduleAheadTime = 0.1;
  let nextNoteTime = 0.0;
  let notesInQueue = [];

  let isPlaying = false;
  let masterVolume = 0.1;

  let tempo = 120.0;
  let meter = 4;
  let measure = 0;
  let subdivision = 1;
  let currentSubdivision = 0;

  let tonic = 62;
  let ascendingFreq = [];
  let ascendingNum = [];
  let descendingFreq = [];
  let descendingNum = [];
  let activeScale = [];

  let melody = {
    arr: [],
    pos: 0,
    improvise: true,
  };

  let stepThrough = {
    direction: Pattern.increment,
    interval: undefined,
  };

  const masterGainNode = context.createGain();
  masterGainNode.connect(context.destination);
  masterGainNode.gain.value = masterVolume;

  // converts scale steps to array indexes
  const setMelodyArr = (scaleSteps) => {
    melody.arr = scaleSteps.map((step, i) => {
      return step - 1;
    });
  };

  const getRaga = (ragaName) => {
    const raga = new Raga(midiNums, ragaName, tonic)
    ascendingFreq = raga.aarohFreq;
    ascendingNum = raga.aarohNum;
    descendingFreq = raga.avrohFreq;
    descendingNum = raga.avrohNum;
  };

  getRaga(ragas['major']);
  activeScale = descendingFreq;

  let fooMotif = [1, 4, 3, 4, 5];

  const improvise = (scaleSteps) => {
    if (scaleSteps) {
      setMelodyArr(scaleSteps);
    }

    stepThrough.direction = Pattern.increment;
    stepThrough.interval = 4;
  };


  const playMotif = (scaleSteps) => {
    if (scaleSteps) {
      setMelodyArr(scaleSteps);
    }

    stepThrough.direction = Pattern.increment;
    stepThrough.interval = 1;
  };

  const improvisationState = (bool) => {
    melody.improvise = bool;

    if (melody.improvise === true) {
      improvise(descendingNum);
    }

    if (melody.improvise === false) {
      playMotif(fooMotif);
    }
  }

  improvisationState(false)

  const currentNote = () => {
    let note;

    // if (melody.improvise) {
    //   const bool = Random.boolean();

    //   switch (bool) {
    //     case true:
    //       note = activeScale[melody.pos]
    //       nextNote(melody, Pattern.increment);
    //     case false:
    //       note = activeScale[Random.integer(0, melody.arr.length)];
    //       break;
    //   }
    // }

    // if (!melody.improvise) {
      note = activeScale[melody.pos]
      nextNote(melody);

    //   // if (melody.pos === melody.arr.length - 1) {
    //   //   improvise(descendingNum);
    //   // }
    // }

    return note;
  };

  // sets up the next note in the sequence
  const nextNote = (obj) => {
    const setPos = Pattern.stepThrough(obj, stepThrough.direction, stepThrough.interval);
    const wrappedPos = Pattern.wrapArrayIndex(obj.pos, obj.arr.length);

    obj.pos = wrappedPos;
  }

  const incrementMeasure = (beatNumber) => {
    if (beatNumber === 0) {
      measure++;
    }
  }

  const maxBeats = () => {
    const beats = (meter * subdivision);
    return beats;
  };

  const nextSubdivision = () => {
    const secondsPerBeat = 60.0 / tempo;
    nextNoteTime += (1 / subdivision) * secondsPerBeat; // add beat length to last beat time
    currentSubdivision++;

    // wrap to zero
    if (currentSubdivision == maxBeats()) {
      currentSubdivision = 0;
    }
  };

  // const subdivideSlow = () => {
  //   const chance = Random.boolean();

  //   if (!chance) {
  //     subdivision = Random.fraction(4);
  //   } else {
  //     subdivision = Random.integerInclusive(1, 3);
  //   }

  //   return subdivision;
  // };

  // const subdivide = () => {
  //   switch (true) {
  //     case subdivision <= 1:
  //       subdivideSlow();
  //       break;
  //     case subdivision < 4:
  //       subdivision = Random.integer(1, 4)
  //       break;
  //     case subdivision >= 4:
  //       subdivision = Random.integer(2, 8)
  //       break;
  //   }

  //   return subdivision;
  // };

  const scheduleNote = (beatNumber, time) => {
    // push the note on the queue, even if we're not playing.
    notesInQueue.push({ note: beatNumber, time: time });

    incrementMeasure(beatNumber);
    // updateGUI();

    // if (subdivision % 5 || 7 || 9 === 0) {
    //   if (beatNumber === 0) {
        // subdivision = subdivide();
    //   }
    // } else if (Random.integer(1, 100) % 3 === 0) {
    //   subdivision = subdivide();
    // }

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

    // if (subdivision > 2) {
    //   decay = 0.5;
    // }

    let noteLength = attack + decay;

    vca1.gain.setValueAtTime(0, context.currentTime);
    vca1.gain.linearRampToValueAtTime(1, context.currentTime + attack);
    vca1.gain.linearRampToValueAtTime(0, context.currentTime + noteLength);

    osc1.start(time);
    osc1.stop(time + noteLength);
  };

  const scheduler = () => {
    while (nextNoteTime < context.currentTime + scheduleAheadTime ) {
      scheduleNote( currentSubdivision, nextNoteTime );
      nextSubdivision();
    }
  };

  // const drone = () => {
  //   const root = activeScale[0] * 0.5;

  //   // module vca
  //   const gain1 = context.createGain();
  //   gain1.gain.value = 0.8;
  //   gain1.connect(masterGainNode);

  //   // amplitude mod
  //   const amVCA = context.createGain();
  //   amVCA.connect(gain1);

  //   // carrier osc
  //   const osc1 = context.createOscillator();
  //   osc1.frequency.value = root;
  //   osc1.connect(amVCA);
  //   osc1.start();

  //   // slow trem vca
  //   const gain2 = context.createGain();
  //   gain2.gain.value = 0.4;
  //   gain2.connect(gain1.gain);

  //   // slow trem osc
  //   const osc2 = context.createOscillator();
  //   osc2.type = 'triangle';
  //   osc2.frequency.value = 0.031;
  //   osc2.connect(gain2);
  //   osc2.start();

  //   // am vca
  //   const gain3 = context.createGain();
  //   gain3.gain.value = 0.3;
  //   gain3.connect(amVCA.gain);

  //   // am osc
  //   const osc3 = context.createOscillator();
  //   osc3.type = 'triangle';
  //   osc3.frequency.value = root * 0.5;
  //   osc3.connect(gain3);
  //   osc3.start();
  // };

  const play = () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
      // drone();
      context.resume();
      nextNoteTime = context.currentTime;
      timerWorker.postMessage('start');
    }

    if (!isPlaying) {
      context.suspend();
      timerWorker.postMessage('stop');
    }
  };

  const init = () => {
    timerWorker = new Worker('/metronome.worker.js');

    timerWorker.onmessage = (e) => {
      if (e.data == 'tick') {
        scheduler();
      } else {
        console.log('message: ' + e.data);
      }
    };

    timerWorker.postMessage({ 'interval': lookahead });
  };

  window.addEventListener('load', init );

  return {
    status: {
      isPlaying: () => isPlaying,
    },
    play: () => play(),
  }
}());

export default getSynthEngine;
