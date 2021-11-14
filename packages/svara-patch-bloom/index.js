import {
  SimpleEnvelope,
  SimpleGain,
  SimpleOscillator,
} from 'warbly/packages/modules';
import {
  Composer,
  PitchClassSet,
  Subdivision,
  SimpleReverb,
  synthEngine,
  midi,
  random,
} from 'svara-kriya';

const Bloom = () => {
  const context = new AudioContext();
  const nucleus = new Composer();
  const pitchClassSet = new PitchClassSet({
    tonic: nucleus.tonic,
    octaves: 2,
    scaleSteps: nucleus.raga.avroh,
  });

  const gat = [
    nucleus.getRandomScaleSteps(),
    nucleus.getRandomScaleSteps(),
    nucleus.getRandomScaleSteps(),
  ];

  const scheduleAheadTime = 0.1;

  const volume = (() => {
    const gain = new SimpleGain(context);

    const setGain = (value) => {
      gain.gain.value = value;
    };

    return { gain, setGain };
  })();

  const output = {
    gain: new SimpleGain(context, { connect: volume.gain }),
  };

  const effects = {
    reverb: new SimpleReverb(context, {
      seconds: 3,
      decay: 2,
    }),

    init() {
      this.reverb.connect(output.gain);
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

      const randomGat = gat[random.integer(0, gat.length - 1)];
      this.pitch.arr = Array.from(randomGat, (step) => nucleus.tonic + step);
    },

    scheduleNextPitch() {
      // Improvise
      if (this.isImprovise) {
        this.pitch.setNextPitch(
          random.bool() ? this.pitch.pos : random.integer(0, 4)
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
        connect: output.gain,
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
        frequency: midi.toFreq(this.pitch.getCurrentPitch()),
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
      const root = midi.toFreq(this.pitch.range[0]);

      // voice vca
      const voiceGain = new SimpleGain(context, {
        connect: output.gain,
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
    melodyVoice.motif();
  };

  const start = () => {
    synthEngine.play();
    context.resume();
    droneVoice.patch();
    melodyVoice.nextNoteTime = context.currentTime;
    synthEngine.timerWorker.postMessage('start');
  };

  const stop = () => {
    synthEngine.play();
    context.suspend();
    synthEngine.timerWorker.postMessage('stop');
  };

  const init = () => {
    synthEngine.init(scheduler);
    setMelodicVariables();
    effects.init();
  };

  return {
    init,
    start,
    stop,
    context,
    nucleus,
    output,
    volume,
  };
};

export default Bloom();
