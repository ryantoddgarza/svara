import context, { systemOutput } from '../../utils/WebAudio/audioContext';
import { synthEngine } from '../../utils/SynthEngine';
import { nucleus } from '../nucleus';
import { random } from '../../constants/random-engine';
import * as MIDI from '../../constants/midi';
import * as Pattern from '../../constants/pattern';
import { RagaScales } from '../../constants/raga';
import ragas from '../../constants/ragas.json';

export const bloom = (function() {
  const Nucleus = new Proxy(nucleus, {
    set: function(target, key, value) {
      targe[key] = value;
    }
  });

  const midiNums = MIDI.noteNums;

  let scheduleAheadTime = 0.1;
  let nextNoteTime = 0.0;
  let notesInQueue = [];

  let measure = 0;
  let subdivision;
  let currentSubdivision = 0;

  const root = Nucleus.tonicToFreq() * 0.5;
  let ascendingFreq = [];
  let ascendingNum = [];
  let descendingFreq = [];
  let descendingNum = [];
  let activeScale = [];
  let motif = [1, 4, 3, 4, 5]; // add to init random gen

  let melody = {
    arr: [],
    pos: 0,
    improvise: undefined,
  };

  let stepThrough = {
    direction: Pattern.increment,
    interval: undefined,
  };

  // converts scale steps to array indexes
  const setMelodyArr = (scaleSteps) => {
    melody.arr = scaleSteps.map((step, i) => {
      return step - 1;
    });
  };

  const improvise = (scaleSteps) => {
    melody.improvise = true;

    if (scaleSteps) {
      setMelodyArr(scaleSteps);
    }

    stepThrough.direction = Pattern.increment; // add to init random gen
    stepThrough.interval = 4; // add to init random gen
  };


  const playMotif = (scaleSteps) => {
    melody.improvise = false;

    if (scaleSteps) {
      setMelodyArr(scaleSteps);
    }

    stepThrough.direction = Pattern.increment;
    stepThrough.interval = 1;
  };

  const exitMotif = () => {
    improvise(descendingNum);
  };

  const setImprovisationState = (bool) => {
    if (bool === true) {
      improvise(descendingNum);
    }

    if (bool === false) {
      playMotif(motif);
    }
  };

  const currentNote = () => {
    let note;

    if (melody.improvise) {
      const bool = random.bool();

      switch (bool) {
        case true:
          note = activeScale[melody.pos]
          nextNote(melody, Pattern.increment);
        case false:
          note = activeScale[random.integer(0, melody.arr.length - 1)];
          break;
      }
    }

    if (!melody.improvise) {
      note = activeScale[melody.pos]
      nextNote(melody);

      if (melody.pos === melody.arr.length - 1) {
        exitMotif();
      }
    }

    return note;
  };

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
    const beats = (Nucleus.meter * subdivision);
    return beats;
  };

  const nextSubdivision = () => {
    const secondsPerBeat = 60.0 / Nucleus.tempo;
    nextNoteTime += (1 / subdivision) * secondsPerBeat;
    currentSubdivision++;

    if (currentSubdivision == maxBeats()) {
      currentSubdivision = 0;
    }
  };

  const subdivideSlow = () => {
    const chance = random.bool();

    if (chance) {
      subdivision = random.integer(1, 3);
    }

    if (!chance) {
      subdivision = random.fraction(4);
    }

    return subdivision;
  };

  const subdivide = () => {
    switch (true) {
      case subdivision <= 1:
        subdivideSlow();
        break;
      case subdivision < 4:
        subdivision = random.integer(1, 4)
        break;
      case subdivision >= 4:
        subdivision = random.integer(2, 8)
        break;
    }

    return subdivision;
  };

  const scheduleNote = (beatNumber, time) => {
    // push the note on the queue, even if we're not playing.
    notesInQueue.push({ note: beatNumber, time: time });

    voiceMelody(time);
    nextSubdivision();
    incrementMeasure(beatNumber);

    if (subdivision % 5 || 7 || 9 === 0) {
      if (beatNumber === 0) {
        subdivision = subdivide();
      }
    } else if (random.integer(1, 100) % 3 === 0) {
      subdivision = subdivide();
    }
  };

  const scheduler = () => {
    while (nextNoteTime < context.currentTime + scheduleAheadTime ) {
      scheduleNote( currentSubdivision, nextNoteTime );
    }
  };

  const voiceMelody = (time) => {
    // patch vca
    const vcaOut = context.createGain();
    vcaOut.connect(systemOutput.gainNode);
    vcaOut.gain.value = 0.1;

    // note envelope vca
    const vca1 = context.createGain();
    vca1.connect(vcaOut);
    vca1.gain.value = 0;

    // carrier oscillator
    const osc1 = context.createOscillator();
    osc1.frequency.value = currentNote();
    osc1.connect(vca1);

    let attack = 0.1;
    let decay = (60 / Nucleus.tempo) / subdivision;

    let noteLength = attack + decay;

    vca1.gain.setValueAtTime(0, context.currentTime);
    vca1.gain.linearRampToValueAtTime(1, context.currentTime + attack);
    vca1.gain.linearRampToValueAtTime(0, context.currentTime + noteLength);

    osc1.start(time);
    osc1.stop(time + noteLength);
  }

  const voiceDrone = () => {
    // module vca
    const gain1 = context.createGain();
    gain1.gain.value = 0.05;
    gain1.connect(systemOutput.gainNode);

    // amplitude mod
    const amVCA = context.createGain();
    amVCA.connect(gain1);

    // carrier osc
    const osc1 = context.createOscillator();
    osc1.frequency.value = root;
    osc1.connect(amVCA);
    osc1.start();

    // slow trem vca
    const gain2 = context.createGain();
    gain2.gain.value = 0.025;
    gain2.connect(gain1.gain);

    // slow trem osc
    const osc2 = context.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 0.031;
    osc2.connect(gain2);
    osc2.start();

    // am vca
    const gain3 = context.createGain();
    gain3.gain.value = 0.3;
    gain3.connect(amVCA.gain);

    // am osc
    const osc3 = context.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.value = root * 0.5;
    osc3.connect(gain3);
    osc3.start();
  };

  const setMelodicVariables = (ragaObj) => {
    const ragaScale = new RagaScales(midiNums, ragaObj, Nucleus.tonic)
    ascendingFreq = ragaScale.aarohFreq;
    ascendingNum = ragaScale.aarohNum;
    descendingFreq = ragaScale.avrohFreq;
    descendingNum = ragaScale.avrohNum;
    activeScale = descendingFreq; // move to depend on prev note played
  };

  const setRhythmicVariables = () => {
    subdivision = 1; // randomly gen. limit range
  };

  const play = () => {
    if (synthEngine.isPlaying) {
      voiceDrone();
      context.resume();
      nextNoteTime = context.currentTime;
      synthEngine.timerWorker.postMessage('start');
    }

    if (!synthEngine.isPlaying) {
      context.suspend();
      synthEngine.timerWorker.postMessage('stop');
    }
  };

  const init = () => {
    console.log('bloom init')
    setMelodicVariables(ragas[Nucleus.ragaName]);
    setRhythmicVariables();
    setImprovisationState(false) // randomly gen
  };

  window.addEventListener('load', init);

  return {
    play: function() {
      play()
    },

    scheduler: function() {
      scheduler()
    },
  }
}());

