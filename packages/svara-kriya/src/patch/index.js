import Analyser from '@svara/web-app/src/components/Visualizer/analyser';
import { Subdivision } from '../core';
import Composer from '../Composer';
import {
  midiNumsToFreq,
  frequencyList,
  random,
  scaleStepsToMIDI,
} from '../core/helpers';
import { RagaPitchTables, SimpleReverb, synthEngine } from '../modules';

const patch = (function () {
  const context = new AudioContext();
  const nucleus = new Composer();
  const subdivision = new Subdivision({ meter: nucleus.meter });
  const ragaPitchData = new RagaPitchTables(nucleus.raga, nucleus.tonic);
  const scheduleAheadTime = 0.1;
  let nextNoteTime = 0.0;
  let notesInQueue = [];
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

  const incrementNextNoteTime = () => {
    const secondsPerBeat = 60.0 / nucleus.tempo;
    nextNoteTime += (1 / subdivision.value) * secondsPerBeat;
  };

  const scheduleNote = (beatNumber, time) => {
    // push the note on the queue, even if we're not playing.
    notesInQueue.push({ note: beatNumber, time });

    melodyVoice.patch(time);
    subdivision.next(() => {
      incrementNextNoteTime();
    });

    subdivision.newQuantizedToDownbeat(5);
    subdivision.newQuantizedToDownbeat(7);
    subdivision.newQuantizedToDownbeat(9);

    if (random.integer(1, 100) % 2 === 0) {
      subdivision.new();
    }
  };

  const scheduler = () => {
    while (nextNoteTime < context.currentTime + scheduleAheadTime) {
      scheduleNote(subdivision.current, nextNoteTime);
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
  };

  const playMotif = (scaleSteps) => {
    melody.improvise = false;

    if (scaleSteps) {
      setMelodyArr(scaleSteps);
    }
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

  const nextNote = (interval) => {
    const modN = (n, mod) => n % mod;
    melody.pos = modN(melody.pos + interval, melody.arr.length);
  };

  const currentNote = () => {
    let note;

    if (melody.improvise) {
      const bool = random.bool();

      if (bool === true) {
        note = activeScale[melody.pos];
        nextNote(4);
      }

      if (bool === false) {
        note = activeScale[random.integer(0, 4)];
        nextNote(4);
      }
    }

    if (!melody.improvise) {
      note = activeScale[melody.pos];
      nextNote(1);

      if (melody.pos === melody.arr.length - 1) {
        exitMotif();
      }
    }

    return note;
  };

  const systemOutput = (function () {
    const initVolume = localStorage.getItem('volume') || 1;

    const gainNode = context.createGain();
    gainNode.connect(context.destination);
    gainNode.gain.value = initVolume;

    return {
      initVolume,
      gainNode,
      setGain(value) {
        gainNode.gain.value = value;
      },
    };
  })();

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

    setRange(midiRoot, nOctaves) {
      const scaleStepsWithRoot = scaleStepsToMIDI(
        ragaPitchData.avrohScaleSteps,
        midiRoot,
      );

      for (let i = 0; i < nOctaves; i += 1) {
        scaleStepsWithRoot.forEach((midiNum) => {
          this.range.push(midiNum + 12 * i);
        });
      }

      activeScale = midiNumsToFreq(this.range);
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
      const decay = 60 / nucleus.tempo / subdivision.value;
      const noteLength = attack + decay;

      // envelope
      vca1.gain.setValueAtTime(0, time);
      vca1.gain.linearRampToValueAtTime(1, time + attack);
      vca1.gain.linearRampToValueAtTime(0, time + noteLength);
      osc1.start(time);
      osc1.stop(time + noteLength);
    },

    init() {
      this.setRange(nucleus.tonic, 2);
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

    const root = frequencyList[nucleus.tonic];

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
    ascendingFreq = ragaPitchData.aarohFrequencies;
    ascendingNum = ragaPitchData.aarohScaleSteps;
    descendingFreq = ragaPitchData.avrohFrequencies;
    descendingNum = ragaPitchData.avrohScaleSteps;
  };

  const setRhythmicVariables = () => {
    // subdivision.value = 1;
  };

  const play = () => {
    synthEngine.play();

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
    synthEngine.init(scheduler);
    setMelodicVariables();
    setRhythmicVariables();
    setImprovisationState(false); // randomly gen
    effects.init();
    master.init();
    melodyVoice.init();
  };

  return {
    init,
    play,
    context,
    nucleus,
    systemOutput,
  };
})();

export default patch;
