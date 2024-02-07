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
  const composer = new Composer({ tempo: 60 });

  const metadata = {
    raga: {
      name: composer.raga.name,
      prahar: composer.raga.prahar,
      vadi: composer.raga.vadi,
      samvadi: composer.raga.samvadi,
      thaat: {
        name: composer.raga.thaat.name,
      },
    },
  };

  let audioScheduler = null;
  const context = new AudioContext();
  const random = new Random();

  const volume = new SimpleGain(context);
  volume.connect(context.destination);

  const output = new SimpleGain(context);
  output.connect(volume.input);

  const reverb = new SimpleReverb(context, {
    seconds: 3,
    decay: 2,
  });
  reverb.connect(output);

  const melodyVoice = {
    subdivision: new Subdivision({ meter: composer.meter }),

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
        const steps = composer.genRandomScaleSteps(
          composer.raga.avroh,
          random.integer(5, 8),
        );
        const MIDI = Array.from(steps, (step) => composer.tonic + step);
        this.gats[i] = MIDI;
      }
    },

    getRandomGat() {
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
            composer.raga.aaroh,
            composer.tonic,
            2,
          );
        } else if (delta < 0) {
          // Descending MIDI values
          this.pitch.set = midi.fromPitchClass(
            composer.raga.avroh,
            composer.tonic,
            2,
          );
        }

        // Handle position beyond array bounds
        this.pitch.pos = escapeIndex(n, this.pitch.set.length);
      }
    },

    setNextNoteTime() {
      const secondsPerBeat = 60.0 / composer.tempo;
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
      const scheduleAheadTime = 0.1;

      while (this.nextNoteTime < context.currentTime + scheduleAheadTime) {
        this.scheduleNextPitch();
        this.scheduleNextNote(this.subdivision.current, this.nextNoteTime);
      }
    },

    patch(time) {
      const FREQUENCY = midi.toFreq(this.pitch.set[this.pitch.pos])?.toFixed(2);

      const outputGain = new SimpleGain(context);
      outputGain.gain = 0.2;
      outputGain.connect(output.input);
      outputGain.connect(reverb.input);

      // Carrier oscillator

      const gain1 = new SimpleGain(context);
      gain1.gain = 0;
      gain1.connect(outputGain.input);

      const osc1 = new SimpleOscillator(context);
      osc1.frequency = FREQUENCY;
      osc1.connect(gain1.input);

      // Envelope

      const variableRelease = 60 / composer.tempo / this.subdivision.value;
      const envelope = new SimpleEnvelope(context);
      envelope.attack = 0.1;
      envelope.release = variableRelease;
      envelope.connect(gain1.input.gain);

      // Run

      osc1.output.start(time);
      envelope.trigger();
      osc1.output.stop(time + envelope.length);
    },
  };

  const droneVoice = {
    patch() {
      const TONIC_FREQUENCY = midi.toFreq(composer.tonic) * 0.5;

      const outputGain = new SimpleGain(context);
      outputGain.gain = 0.2;
      outputGain.connect(output.input);
      outputGain.connect(reverb.input);

      // Modulating oscillator: Amplitude modulates the output gain

      const gain1 = new SimpleGain(context);
      gain1.gain = 0.1; // Additive to the value set in `outputGain.gain`
      gain1.connect(outputGain.input.gain);

      const osc1 = new SimpleOscillator(context);
      osc1.type = 'triangle';
      osc1.frequency = random.integer(1, 3) / random.integer(60, 120);
      osc1.connect(gain1.input);

      // Carrier oscillator

      const gain2 = new SimpleGain(context);
      gain2.connect(outputGain.input);

      const osc2 = new SimpleOscillator(context);
      osc2.frequency = TONIC_FREQUENCY;
      osc2.connect(gain2.input);

      // Modulating oscillator: Frequency modulates the carrier oscillator

      const gain3 = new SimpleGain(context);
      gain3.gain = random.integer(0, 3) / 10;
      gain3.connect(gain2.input.gain);

      const osc3FrequencyMultiplier = random.integer(2, 6) / 10 + 1;
      const osc3 = new SimpleOscillator(context);
      osc3.type = 'triangle';
      osc3.frequency = TONIC_FREQUENCY * osc3FrequencyMultiplier;
      osc3.connect(gain3.input);

      // Modulating oscillator: Amplitude modulates the FM oscillator

      const gain4 = new SimpleGain(context);
      gain4.gain = 0.15; // Additive to the value set in `gain3.gain`
      gain4.connect(gain3.input.gain);

      const osc4 = new SimpleOscillator(context);
      osc4.type = 'triangle';
      osc4.frequency = random.integer(1, 5) / random.integer(60, 120);
      osc4.connect(gain4.input);

      // Run

      osc1.start();
      osc2.start();
      osc3.start();
      osc4.start();
    },
  };

  function start() {
    audioScheduler.start();
    context.resume();
    droneVoice.patch();
    melodyVoice.nextNoteTime = context.currentTime;
  }

  function stop() {
    audioScheduler.stop();
    context.suspend();
  }

  function init() {
    audioScheduler = new AudioScheduler(() => melodyVoice.scheduler());
  }

  return {
    init,
    start,
    stop,
    audioContext: context,
    audioScheduler,
    output,
    volume,
    metadata,
  };
};

export default Bloom();
