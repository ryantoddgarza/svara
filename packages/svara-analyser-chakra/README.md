# svara-analyser-chakra

Audio frequency data visualization adapted from [Audio Player by Alex Permyakov](https://codepen.io/alexdevp/pen/RNELPV).

## Usage

### Initialize

Pass an audio context to the `init` method to initialize the analyser.

```js
Analyser.init(myAudioContext);
```

### Connect

Connect the analyser node `Analyser.analyser` to an audio source.

```js
myAudioSource.gain.connect(Analyser.analyser);
```

### Stop

Call the `stop` method to stop the analyser.

```js
Analyser.stop();
```
