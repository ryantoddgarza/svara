import Analyser from '@svara/web-app/src/components/Visualizer/analyser';
import { Subdivision } from '../core';
import Composer from '../Composer';
import { frequencyList, random, scaleStepsToMIDI } from '../core/helpers';
import { RagaPitchTables, SimpleReverb, synthEngine } from '../modules';

const patch = (function () {
  const context = new AudioContext();
  const nucleus = new Composer();
  const subdivision = new Subdivision({ meter: nucleus.meter });
  const ragaPitchData = new RagaPitchTables(nucleus.raga, nucleus.tonic);
  const scheduleAheadTime = 0.1;
  let notesInQueue = [];
  let ascendingFreq = [];
  let ascendingNum = [];
  let descendingFreq = [];
  let descendingNum = [];
  let improvise;

  // steps, midi, and freq quantized to aaroh
  const makeMotif = (steps) =>
    steps.map((step) => ragaPitchData.aarohScaleSteps[step]);
  const motif = makeMotif([0, 3, 2, 3, 4]);
  const motifMIDI = scaleStepsToMIDI(motif, nucleus.tonic);

  const playImprovise = () => {
    improvise = true;
    note.arr = note.range;
  };

  const playMotif = () => {
    improvise = false;
    note.arr = motifMIDI;
  };

  const note = {
    nextNoteTime: 0.0,
    arr: [], // variable possible midi nums
    pos: 0,
    range: [], // n octaves of midi nums

    getCurrentPitch() {
      return this.arr[this.pos];
    },

    setNextPitch(interval) {
      const modN = (n, mod) => n % mod;
      this.pos = modN(this.pos + interval, this.arr.length);
      console.log({
        range: this.range,
        arr: this.arr,
        pos: this.pos,
      });
    },

    setNextTime() {
      const secondsPerBeat = 60.0 / nucleus.tempo;
      this.nextNoteTime += (1 / subdivision.value) * secondsPerBeat;
    },

    // Expand raga mod 12 scale steps to n octaves of midi nums
    // steps, midi, and freq quantized to avroh
    setRange(midiRoot, nOctaves = 1) {
      const midiNums = scaleStepsToMIDI(
        ragaPitchData.avrohScaleSteps,
        midiRoot,
      );

      for (let i = 1; i < nOctaves; i += 1) {
        midiNums.forEach((midiNum) => {
          this.range.push(midiNum + 12 * i);
        });
      }
    },

    init() {
      this.setRange(nucleus.tonic, 2);
    },
  };

  const currentNote = () => frequencyList[note.getCurrentPitch()];

  const scheduleNextPitch = () => {
    // Improvise
    if (improvise) {
      note.setNextPitch(random.bool() ? note.pos : random.integer(0, 4));

      if (random.integer(0, 9) === 0) {
        note.pos = 0;
        playMotif();
      }
    }

    // Motif
    if (!improvise) {
      note.setNextPitch(1);

      if (note.pos === note.arr.length - 1) {
        playImprovise();
      }
    }
  };

  const scheduleNextNote = (beatNumber, time) => {
    notesInQueue.push({ note: beatNumber, time });

    melodyVoice.patch(time);
    subdivision.next(() => {
      note.setNextTime();
    });

    subdivision.newQuantizedToDownbeat(5);
    subdivision.newQuantizedToDownbeat(7);
    subdivision.newQuantizedToDownbeat(9);

    if (random.integer(1, 100) % 2 === 0) {
      subdivision.new();
    }
  };

  const scheduler = () => {
    while (note.nextNoteTime < context.currentTime + scheduleAheadTime) {
      scheduleNextPitch();
      scheduleNextNote(subdivision.current, note.nextNoteTime);
    }
  };

  const systemOutput = (function () {
    const gainNode = context.createGain();
    gainNode.connect(context.destination);

    return {
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
    note.init();
    // random.bool() ? playImprovise() : playMotif();
    playMotif();
  };

  const setRhythmicVariables = () => {};

  const play = () => {
    synthEngine.play();

    if (synthEngine.isPlaying) {
      voiceDrone();
      context.resume();
      note.nextNoteTime = context.currentTime;
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
    effects.init();
    master.init();
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
