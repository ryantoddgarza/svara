import synthEngine from '~/synth/modules/synthEngine';
import { context, systemOutput } from '~/synth/modules/audioContext';
import nucleus from '~/synth/modules/nucleus';
import random from '~/synth/modules/random';
import * as MIDI from '~/synth/modules/midi';
import * as Pattern from '~/synth/modules/pattern';
import SimpleReverb from '~/synth/modules/simpleReverb';
import Analyser from '~/components/Visualizer/analyser';
import { RagaScales } from '~/utils/raga';

const patch = (function() {
  const Nucleus = new Proxy(nucleus, {
    set(target, key, value) {
      target[key] = value;
    },
  });

  const midiNums = MIDI.noteNums;
  const ragaPitchData = new RagaScales(midiNums, Nucleus.raga, Nucleus.tonic);

  const scheduleAheadTime = 0.1;
  let nextNoteTime = 0.0;
  let notesInQueue = [];

  let measure = 0;
  let subdivision;
  let currentSubdivision = 0;

  let ascendingFreq = [];
  let ascendingNum = [];
  let descendingFreq = [];
  let descendingNum = [];
  let activeScale = [];
  let motif = [0, 3, 2, 3, 4]; // add to init random gen

  const melody = {
    arr: [],
    pos: 0,
    improvise: undefined,
  };

  const stepThrough = {
    direction: Pattern.increment,
    interval: undefined,
  };

  const incrementMeasure = (beatNumber) => {
    if (beatNumber === 0) {
      measure += 1;
    }
  };

  const maxBeats = () => {
    const beats = (Nucleus.meter * subdivision);
    return beats;
  };

  const nextSubdivision = () => {
    const secondsPerBeat = 60.0 / Nucleus.tempo;
    nextNoteTime += (1 / subdivision) * secondsPerBeat;
    currentSubdivision += 1;

    if (currentSubdivision === maxBeats()) {
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
    if (subdivision <= 1) {
      subdivideSlow();
    }

    if (subdivision < 4) {
      subdivision = random.integer(1, 4);
    }

    if (subdivision >= 4) {
      subdivision = random.integer(2, 6);
    }

    return subdivision;
  };

  const scheduleNote = (beatNumber, time) => {
    // push the note on the queue, even if we're not playing.
    notesInQueue.push({ note: beatNumber, time });

    melodyVoice.patch(time);
    nextSubdivision();
    incrementMeasure(beatNumber);

    if (subdivision % 5 || 7 || 9 === 0) {
      if (beatNumber === 0) {
        subdivision = subdivide();
      }
    }

    if (random.integer(1, 100) % 2 === 0) {
      subdivision = subdivide();
    }
  };

  const scheduler = () => {
    while (nextNoteTime < context.currentTime + scheduleAheadTime) {
      scheduleNote(currentSubdivision, nextNoteTime);
    }
  };

  // converts scale steps to array indexes
  const setMelodyArr = (scaleSteps) => {
    melody.arr = scaleSteps.map((step) => step);
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
    improvise(melodyVoice.range);
  };

  const setImprovisationState = (bool) => {
    if (bool === true) {
      improvise(melodyVoice.range);
    }

    if (bool === false) {
      playMotif(motif);
    }
  };

  const nextNote = (obj) => {
    const setPos = Pattern.stepThrough(obj, stepThrough.direction, stepThrough.interval);
    const wrappedPos = Pattern.wrapArrayIndex(obj.pos, obj.arr.length);

    obj.pos = wrappedPos;
  };

  const currentNote = () => {
    let note;

    if (melody.improvise) {
      const bool = random.bool();

      if (bool === true) {
        note = activeScale[melody.pos];
        nextNote(melody);
      }

      if (bool === false) {
        note = activeScale[random.integer(0, 4)];
        nextNote(melody);
      }
    }

    if (!melody.improvise) {
      note = activeScale[melody.pos];
      nextNote(melody);

      if (melody.pos === melody.arr.length - 1) {
        exitMotif();
      }
    }

    return note;
  };

  const master = {
    vca: context.createGain(),

    connectToAnalyzer() {
      if (Analyser.analyser) {
        this.vca.connect(Analyser.analyser);
      }
    },

    pollForAnalyzer() {
      setInterval(() => {
        this.connectToAnalyzer();
      }, 1000);
    },

    init() {
      this.vca.connect(systemOutput.gainNode);
      this.vca.gain.value = 1;
      this.pollForAnalyzer();
    },
  };

  const effects = {
    reverb: new SimpleReverb(context, {
      seconds: 3,
      decay: 2,
    }),
    init() {
      this.reverb.connect(master.vca);
    },
  };

  const melodyVoice = {
    range: [],

    setRange(rootNum, numberOfOctaves) {
      const scaleSteps = ragaPitchData.avrohNum;
      const rangeNums = [];

      const scaleStepsWithRoot = scaleSteps.map((midiNum) => midiNum + rootNum);

      for (let i = 0; i < numberOfOctaves; i += 1) {
        scaleStepsWithRoot.forEach((midiNum) => {
          rangeNums.push(midiNum + (12 * i));
        });
      }

      this.range = rangeNums;
      activeScale = MIDI.midiToFreq(rangeNums);
    },

    patch(time) {
      // sub-patch vca
      const vcaOut = context.createGain();
      vcaOut.connect(master.vca);
      vcaOut.connect(effects.reverb.input);
      vcaOut.gain.value = 0.2;

      // note envelope vca
      const vca1 = context.createGain();
      vca1.connect(vcaOut);
      vca1.gain.value = 0;

      // carrier oscillator
      const osc1 = context.createOscillator();
      osc1.frequency.value = currentNote();
      osc1.connect(vca1);

      const attack = 0.1;
      const decay = (60 / Nucleus.tempo) / subdivision;
      const noteLength = attack + decay;

      // envelope
      vca1.gain.setValueAtTime(0, time);
      vca1.gain.linearRampToValueAtTime(1, time + attack);
      vca1.gain.linearRampToValueAtTime(0, time + noteLength);
      osc1.start(time);
      osc1.stop(time + noteLength);
    },

    init() {
      this.setRange(Nucleus.tonic, 2);
    },
  };

  const voiceDrone = () => {
    // sub-patch vca
    const gain1 = context.createGain();
    gain1.gain.value = 0.1;
    gain1.connect(master.vca);
    gain1.connect(effects.reverb.input);

    // amplitude mod
    const amMod = context.createGain();
    amMod.connect(gain1);

    const root = Nucleus.tonicToFreq();

    // carrier osc
    const osc1 = context.createOscillator();
    osc1.frequency.value = root;
    osc1.connect(amMod);
    osc1.start();

    // sub osc
    const subOsc = context.createOscillator();
    subOsc.frequency.value = root * 0.50001;
    subOsc.connect(amMod);
    subOsc.start();

    // am vca
    const gain3 = context.createGain();
    gain3.gain.value = 0.5;
    gain3.connect(amMod.gain);

    // am osc
    const osc3 = context.createOscillator();
    osc3.type = 'triangle';
    osc3.frequency.value = root * 0.5;
    osc3.connect(gain3);
    osc3.start();

    // slow trem vca
    const gain2 = context.createGain();
    gain2.gain.value = 0.06;
    gain2.connect(gain1.gain);

    // slow trem osc
    const osc2 = context.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 0.02;
    osc2.connect(gain2);
    osc2.start();
  };

  const setMelodicVariables = () => {
    ascendingFreq = ragaPitchData.aarohFreq;
    ascendingNum = ragaPitchData.aarohNum;
    descendingFreq = ragaPitchData.avrohFreq;
    descendingNum = ragaPitchData.avrohNum;
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
    setMelodicVariables();
    setRhythmicVariables();
    setImprovisationState(false); // randomly gen
    effects.init();
    master.init();
    melodyVoice.init();
  };

  window.addEventListener('load', init);

  return {
    play() {
      play();
    },

    scheduler() {
      scheduler();
    },
  };
}());

export default patch;
