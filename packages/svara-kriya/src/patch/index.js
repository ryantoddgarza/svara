import Analyser from '@svara/web-app/src/components/Visualizer/analyser';
import {
  SimpleEnvelope,
  SimpleGain,
  SimpleOscillator,
} from 'warbly/packages/modules';
import { PitchClassSet, Subdivision } from '../core';
import Composer from '../Composer';
import { midiToFreq, random, scaleStepsToMIDI } from '../core/helpers';
import { RagaPitchTables, SimpleReverb, synthEngine } from '../modules';

const patch = (function () {
  const context = new AudioContext();
  const nucleus = new Composer();
  const ragaPitchData = new RagaPitchTables(nucleus.raga, nucleus.tonic);
  const pitchClassSet = new PitchClassSet({
    tonic: nucleus.tonic,
    octaves: 2,
    scaleSteps: ragaPitchData.avrohScaleSteps,
  });
  const scheduleAheadTime = 0.1;

  // steps, midi, and freq quantized to aaroh
  const makeMotif = (steps) =>
    steps.map((step) => ragaPitchData.aarohScaleSteps[step]);
  const motif = makeMotif([0, 3, 2, 3, 4]);
  const motifMIDI = scaleStepsToMIDI(motif, nucleus.tonic);

  const systemOutput = (function systemOutput() {
    const gain = new SimpleGain(context);

    function setGain(value) {
      gain.gain.value = value;
    }

    return { gain, setGain };
  })();

  const master = {
    gain: new SimpleGain(context, { connect: systemOutput.gain }),

    connectToAnalyzer() {
      if (Analyser.analyser) {
        this.gain.connect(Analyser.analyser);
      }
    },

    pollForAnalyzer() {
      setInterval(() => {
        this.connectToAnalyzer();
      }, 1000);
    },

    init() {
      this.pollForAnalyzer();
    },
  };

  const effects = {
    reverb: new SimpleReverb(context, {
      seconds: 3,
      decay: 2,
    }),

    init() {
      this.reverb.connect(master.gain);
    },
  };

  const melodyVoice = {
    subdivision: new Subdivision({ meter: nucleus.meter }),

    pitch: pitchClassSet,

    queue: [],

    nextNoteTime: 0.0,

    isImprovise: false,

    improvise() {
      this.isImprovise = true;
      this.pitch.arr = this.pitch.range;
    },

    motif() {
      this.isImprovise = false;
      this.pitch.arr = motifMIDI;
    },

    scheduleNextPitch() {
      // Improvise
      if (this.isImprovise) {
        this.pitch.setNextPitch(
          random.bool() ? this.pitch.pos : random.integer(0, 4),
        );

        if (random.integer(0, 9) === 0) {
          this.pitch.pos = 0;
          this.motif();
        }
      }

      // Motif
      if (!this.isImprovise) {
        this.pitch.setNextPitch(1);

        if (this.pitch.pos === this.pitch.arr.length - 1) {
          this.improvise();
        }
      }
    },

    setNextNoteTime() {
      const secondsPerBeat = 60.0 / nucleus.tempo;
      this.nextNoteTime += (1 / this.subdivision.value) * secondsPerBeat;
    },

    scheduleNextNote(beatNumber, time) {
      this.queue.push({ note: beatNumber, time });

      this.patch(time);
      this.subdivision.next(() => {
        this.setNextNoteTime();
      });

      this.subdivision.newQuantizedToDownbeat(5);
      this.subdivision.newQuantizedToDownbeat(7);
      this.subdivision.newQuantizedToDownbeat(9);

      if (random.integer(1, 100) % 2 === 0) {
        this.subdivision.new();
      }
    },

    scheduler() {
      while (this.nextNoteTime < context.currentTime + scheduleAheadTime) {
        this.scheduleNextPitch();
        this.scheduleNextNote(this.subdivision.current, this.nextNoteTime);
      }
    },

    patch(time) {
      // voice vca
      const voiceGain = new SimpleGain(context, {
        connect: master.gain,
        gain: 0.2,
      });
      voiceGain.connect(effects.reverb.input);

      // carrier osc vca gated by envelope
      const gain1 = new SimpleGain(context, {
        connect: voiceGain,
        gain: 0,
      });

      // carrier oscillator
      const osc1 = new SimpleOscillator(context, {
        connect: gain1,
        frequency: midiToFreq(this.pitch.getCurrentPitch()),
      });

      const variableRelease = 60 / nucleus.tempo / this.subdivision.value;

      const envelope = new SimpleEnvelope(context, {
        connect: gain1.gain,
        attack: 0.1,
        release: variableRelease,
      });

      function main() {
        envelope.trigger();
        osc1.start(time);
        osc1.stop(time + envelope.getLength());
      }

      main();
    },
  };

  const droneVoice = {
    pitch: pitchClassSet,

    patch() {
      const root = midiToFreq(this.pitch.range[0]);

      // voice vca
      const voiceGain = new SimpleGain(context, {
        connect: master.gain,
        gain: 0.1,
      });
      voiceGain.connect(effects.reverb.input);

      // carrier/sub osc vca. amplitude modulated by amGain
      const gain1 = new SimpleGain(context, { connect: voiceGain });

      // carrier osc
      const osc1 = new SimpleOscillator(context, {
        connect: gain1,
        frequency: root,
      });

      // sub osc
      const subOsc = new SimpleOscillator(context, {
        connect: gain1,
        frequency: root * 0.5,
        detune: 2,
      });

      // gain1 am osc attenuator
      const amOscGain = new SimpleGain(context, { connect: gain1, gain: 0.5 });

      // gain1 am osc
      const amOsc = new SimpleOscillator(context, {
        connect: amOscGain,
        frequency: root * 0.5,
        detune: 5,
        type: 'triangle',
      });

      // voiceGain am osc slow trem attenuator
      const gain2 = new SimpleGain(context, {
        connect: voiceGain.gain,
        gain: 0.06,
      });

      // voiceGain am slow trem osc
      const osc2 = new SimpleOscillator(context, {
        connect: gain2,
        frequency: 0.02,
        type: 'triangle',
      });

      function main() {
        osc1.start();
        subOsc.start();
        amOsc.start();
        osc2.start();
      }

      main();
    },
  };

  const scheduler = () => {
    melodyVoice.scheduler();
  };

  const setMelodicVariables = () => {
    // random.bool() ? melodyVoice.improvise() : melodyVoice.motif();
    melodyVoice.motif();
  };

  const play = () => {
    synthEngine.play();

    if (synthEngine.isPlaying) {
      context.resume();
      droneVoice.patch();
      melodyVoice.nextNoteTime = context.currentTime;
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
