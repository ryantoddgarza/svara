const Framer = {
  countTicks: 360,

  frequencyData: [],

  tickSize: 10,

  PI: 360,

  index: 0,

  loadingAngle: 0,

  init(scene) {
    this.canvas = document.querySelector('canvas');
    this.scene = scene;
    this.context = scene.context;
    this.configure();
  },

  configure() {
    this.maxTickSize = this.tickSize * 9 * this.scene.scaleCoef;
    this.countTicks = 360 * Scene.scaleCoef;
  },

  draw() {
    this.drawTicks();
    this.drawEdging();
  },

  drawTicks() {
    this.context.save();
    this.context.beginPath();
    this.context.lineWidth = 1;
    this.ticks = this.getTicks(this.countTicks, this.tickSize, [0, 90]);
    for (let i = 0, len = this.ticks.length; i < len; ++i) {
      const tick = this.ticks[i];
      this.drawTick(tick.x1, tick.y1, tick.x2, tick.y2);
    }
    this.context.restore();
  },

  drawTick(x1, y1, x2, y2) {
    const dx1 = parseInt(this.scene.cx + x1, 10);
    const dy1 = parseInt(this.scene.cy + y1, 10);

    const dx2 = parseInt(this.scene.cx + x2, 10);
    const dy2 = parseInt(this.scene.cy + y2, 10);

    const gradient = this.context.createLinearGradient(dx1, dy1, dx2, dy2);
    gradient.addColorStop(0, '#1b1b1b');
    gradient.addColorStop(0.6, '#2e2e2e');
    gradient.addColorStop(1, '#454545');
    this.context.beginPath();
    this.context.strokeStyle = gradient;
    this.context.lineWidth = 2;
    this.context.moveTo(this.scene.cx + x1, this.scene.cx + y1);
    this.context.lineTo(this.scene.cx + x2, this.scene.cx + y2);
    this.context.stroke();
  },

  setLoadingPercent(percent) {
    this.loadingAngle = percent * 2 * Math.PI;
  },

  drawEdging() {
    this.context.save();
    this.context.beginPath();
    this.context.strokeStyle = 'rgba(27, 27, 27, 1)';
    this.context.lineWidth = 1;

    const offset = Tracker.lineWidth / 2;
    this.context.moveTo(
      this.scene.padding + 2 * this.scene.radius - Tracker.innerDelta - offset,
      this.scene.padding + this.scene.radius
    );
    this.context.arc(
      this.scene.cx,
      this.scene.cy,
      this.scene.radius - Tracker.innerDelta - offset,
      0,
      this.loadingAngle,
      false
    );

    this.context.stroke();
    this.context.restore();
  },

  getTicks(count, size = 10, animationParams) {
    const ticks = this.getTickPoitns(count);
    let x1;
    let y1;
    let x2;
    let y2;
    let tick;
    let k;
    const m = [];
    const lesser = 160;
    const allScales = [];

    for (let i = 0, len = ticks.length; i < len; ++i) {
      const coef = 1 - i / (len * 2.5);
      let delta =
        ((this.frequencyData[i] || 0) - lesser * coef) * this.scene.scaleCoef;
      if (delta < 0) {
        delta = 0;
      }
      tick = ticks[i];
      if (
        animationParams[0] <= tick.angle &&
        tick.angle <= animationParams[1]
      ) {
        k =
          this.scene.radius /
          (this.scene.radius -
            this.getSize(tick.angle, animationParams[0], animationParams[1]) -
            delta);
      } else {
        k = this.scene.radius / (this.scene.radius - (size + delta));
      }
      x1 = tick.x * (this.scene.radius - size);
      y1 = tick.y * (this.scene.radius - size);
      x2 = x1 * k;
      y2 = y1 * k;
      m.push({ x1, y1, x2, y2 });
      if (i < 20) {
        let scale = delta / 50;
        scale = scale < 1 ? 1 : scale;
        allScales.push(scale);
      }
    }
    const sum = allScales.reduce((pv, cv) => pv + cv, 0) / allScales.length;
    this.canvas.style.transform = `scale(${sum})`;
    return m;
  },

  getSize(angle, l, r) {
    const m = (r - l) / 2;
    const x = angle - l;
    let h;

    if (x === m) {
      return this.maxTickSize;
    }
    const d = Math.abs(m - x);
    const v = 70 * Math.sqrt(1 / d);
    if (v > this.maxTickSize) {
      h = this.maxTickSize - d;
    } else {
      h = Math.max(this.tickSize, v);
    }

    if (this.index > this.count) {
      this.index = 0;
    }

    return h;
  },

  getTickPoitns(count) {
    const coords = [];
    const step = this.PI / count;
    for (let deg = 0; deg < this.PI; deg += step) {
      const rad = (deg * Math.PI) / (this.PI / 2);
      coords.push({ x: Math.cos(rad), y: -Math.sin(rad), angle: deg });
    }
    return coords;
  },
};

const Tracker = {
  innerDelta: 20,

  lineWidth: 7,

  prevAngle: 0.5,

  angle: 0,

  animationCount: 10,

  pressButton: false,

  init(scene) {
    this.scene = scene;
    this.context = scene.context;
  },

  draw() {
    if (!Analyser.source.buffer) {
      return;
    }
    if (!this.pressButton) {
      this.angle =
        (Analyser.context.currentTime / Analyser.source.buffer.duration) *
          2 *
          Math.PI || 0;
    }
    this.drawArc();
  },

  drawArc() {
    this.context.save();
    this.context.strokeStyle = 'rgba(254, 67, 101, 0.8)';
    this.context.beginPath();
    this.context.lineWidth = this.lineWidth;

    this.r = this.scene.radius - (this.innerDelta + this.lineWidth / 2);
    this.context.arc(
      this.scene.radius + this.scene.padding,
      this.scene.radius + this.scene.padding,
      this.r,
      0,
      this.angle,
      false
    );
    this.context.stroke();
    this.context.restore();
  },
};

const Scene = {
  padding: 120,

  minSize: 740,

  optimiseHeight: 982,

  _inProcess: false,

  init() {
    this.canvasConfigure();
    this.initHandlers();

    Framer.init(this);
    Tracker.init(this);

    this.startRender();
  },

  canvasConfigure() {
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');
    this.context.strokeStyle = '#FE4365';
    this.calculateSize();
  },

  calculateSize() {
    this.scaleCoef = Math.max(0.5, 740 / this.optimiseHeight);

    const size = Math.max(this.minSize, 1);
    this.canvas.setAttribute('width', size);
    this.canvas.setAttribute('height', size);

    this.width = size;
    this.height = size;

    this.radius = (size - this.padding * 2) / 2;
    this.cx = this.radius + this.padding;
    this.cy = this.radius + this.padding;
    this.coord = this.canvas.getBoundingClientRect();
  },

  initHandlers() {
    window.onresize = () => {
      this.canvasConfigure();
      Framer.configure();
      this.render();
    };
  },

  render() {
    requestAnimationFrame(() => {
      this.clear();
      this.draw();
      if (this.inProcess) {
        this.render();
      }
    });
  },

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  },

  draw() {
    Framer.draw();
    Tracker.draw();
  },

  startRender() {
    this.inProcess = true;
    this.render();
  },

  stopRender() {
    this.inProcess = false;
  },

  inProcess() {
    return this.inProcess;
  },
};

const Analyser = {
  buffer: null,

  duration: 0,

  init(context) {
    this.context = context;
    this.firstLaunch = true;
    try {
      this.javascriptNode = this.context.createScriptProcessor(2048, 1, 1);
      this.javascriptNode.connect(this.context.destination);
      this.analyser = this.context.createAnalyser();
      this.analyser.connect(this.javascriptNode);
      this.analyser.smoothingTimeConstant = 0.6;
      this.analyser.fftSize = 2048;
      this.source = this.context.createBufferSource();
      this.destination = this.context.destination;

      this.initHandlers();
    } catch (e) {
      Framer.setLoadingPercent(1);
    }
    Framer.setLoadingPercent(1);
    Scene.init();

    return {
      analyser: this.analyser,
    };
  },

  initHandlers() {
    this.javascriptNode.onaudioprocess = () => {
      Framer.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(Framer.frequencyData);
    };
  },

  stop() {
    this.javascriptNode.onaudioprocess = () => {};
    Scene.stopRender();
  },
};

export default Analyser;
