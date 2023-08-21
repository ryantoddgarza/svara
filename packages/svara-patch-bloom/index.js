import {
  SimpleEnvelope,
  SimpleGain,
  SimpleOscillator,
  SimpleReverb,
} from '@warbly/modules';
import {
  AudioScheduler,
  Composer,
  Queue,
  Subdivision,
  escapeIndex,
  midi,
} from 'svara-kriya';
import { Random } from 'random-js';

const Bloom = () => {
  const context = new AudioContext();
  const nucleus = new Composer({ tempo: 60 });
  const random = new Random();
  let audioScheduler = null;

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

    pitch: {
      set: [],
      pos: 0,
    },

    gats: [],

    motif: [],

    queue: new Queue(),

    nextNoteTime: 0.0,

    improvise: false,

    buildGats(n = 3) {
      // TODO: Should obey ascend/descend rules
      for (let i = 0; i < n; i += 1) {
        const steps = nucleus.genRandomScaleSteps(
          nucleus.raga.avroh,
          random.integer(5, 8),
        );
        const MIDI = Array.from(steps, (step) => nucleus.tonic + step);
        this.gats[i] = MIDI;
      }
    },

    getRandomGat() {
      // Handle unbuilt gats
      if (this.gats.length === 0) {
        this.buildGats();
      }

      const randomGat = this.gats[random.integer(0, this.gats.length - 1)];
      return randomGat;
    },

    scheduleNextPitch() {
      // IF not improvising AND finished THEN prepare state for improvisation
      if (!this.improvise && this.pitch.pos >= this.pitch.set.length - 1) {
        this.improvise = true;
      }

      // IF improvising AND should switch THEN prepare state for motif
      if (this.improvise && !random.integer(0, 30)) {
        this.improvise = false;
        this.pitch.set = this.getRandomGat();
        this.pitch.pos = -1; // So first note of pitch array is played
      }

      // IF not improvising THEN `motif.next`
      if (!this.improvise) {
        this.pitch.pos += 1;
      }

      // IF improvising THEN `improvise.next`
      if (this.improvise) {
        const maxPosDelta = 5;
        const delta = random.integer(-maxPosDelta, maxPosDelta);
        const n = this.pitch.pos + delta;

        // TODO: Reduce `pitch.set` reassign frequency
        // Set pitch array
        if (delta > 0) {
          // Ascending MIDI values
          this.pitch.set = midi.fromPitchClass(
            nucleus.raga.aaroh,
            nucleus.tonic,
            2,
          );
        } else if (delta < 0) {
          // Descending MIDI values
          this.pitch.set = midi.fromPitchClass(
            nucleus.raga.avroh,
            nucleus.tonic,
            2,
          );
        }

        // Handle position beyond array bounds
        this.pitch.pos = escapeIndex(n, this.pitch.set.length);
      }
    },

    setNextNoteTime() {
      const secondsPerBeat = 60.0 / nucleus.tempo;
      this.nextNoteTime += (1 / this.subdivision.value) * secondsPerBeat;
    },

    scheduleNextNote(beatNumber, time) {
      this.queue.enqueue({ note: beatNumber, time });
      this.queue.dequeue();

      this.patch(time);
      this.subdivision.next(() => {
        this.setNextNoteTime();
      });

      this.subdivision.newQuantizedToDownbeat(5);
      this.subdivision.newQuantizedToDownbeat(7);
      this.subdivision.newQuantizedToDownbeat(9);

      if (random.integer(0, 1)) {
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
        frequency: midi.toFreq(this.pitch.set[this.pitch.pos]),
      });

      const variableRelease = 60 / nucleus.tempo / this.subdivision.value;

      const envelope = new SimpleEnvelope(context, {
        attack: 0.1,
        release: variableRelease,
      });
      envelope.connect(gain1.gain);

      function main() {
        envelope.trigger();
        osc1.start(time);
        osc1.stop(time + envelope.length);
      }

      main();
    },
  };

  const droneVoice = {
    patch() {
      const root = midi.toFreq(nucleus.tonic);

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

  const start = () => {
    audioScheduler.start();
    context.resume();
    droneVoice.patch();
    melodyVoice.nextNoteTime = context.currentTime;
  };

  const stop = () => {
    audioScheduler.stop();
    context.suspend();
  };

  const init = () => {
    audioScheduler = new AudioScheduler(() => melodyVoice.scheduler());
    effects.init();
  };

  return {
    init,
    start,
    stop,
    audioContext: context,
    audioScheduler,
    nucleus,
    output,
    volume,
  };
};

export default Bloom();
