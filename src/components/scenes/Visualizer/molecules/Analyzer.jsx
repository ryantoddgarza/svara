// analyzer adapted from: https://codepen.io/alexdevp/pen/RNELPV?editors=0100
import React from 'react';
import context from '../../../../utils/WebAudio/audio-context';

var Framer = {

  countTicks: 360,

  frequencyData: [],

  tickSize: 10,

  PI: 360,

  index: 0,

  loadingAngle: 0,

  init: function (scene) {
    this.canvas = document.querySelector('canvas');
    this.scene = scene;
    this.context = scene.context;
    this.configure();
  },

  configure: function () {
    this.maxTickSize = this.tickSize * 9 * this.scene.scaleCoef;
    this.countTicks = 360 * Scene.scaleCoef;
  },

  draw: function () {
    this.drawTicks();
    this.drawEdging();
  },

  drawTicks: function () {
    this.context.save();
    this.context.beginPath();
    this.context.lineWidth = 1;
    this.ticks = this.getTicks(this.countTicks, this.tickSize, [0, 90]);
    for (var i = 0, len = this.ticks.length; i < len; ++i) {
      var tick = this.ticks[i];
      this.drawTick(tick.x1, tick.y1, tick.x2, tick.y2);
    }
    this.context.restore();
  },

  drawTick: function (x1, y1, x2, y2) {
    var dx1 = parseInt(this.scene.cx + x1);
    var dy1 = parseInt(this.scene.cy + y1);

    var dx2 = parseInt(this.scene.cx + x2);
    var dy2 = parseInt(this.scene.cy + y2);

    var gradient = this.context.createLinearGradient(dx1, dy1, dx2, dy2);
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

  setLoadingPercent: function (percent) {
    this.loadingAngle = percent * 2 * Math.PI;
  },

  drawEdging: function () {
    this.context.save();
    this.context.beginPath();
    this.context.strokeStyle = 'rgba(27, 27, 27, 1)';
    this.context.lineWidth = 1;

    var offset = Tracker.lineWidth / 2;
    this.context.moveTo(this.scene.padding + 2 * this.scene.radius - Tracker.innerDelta - offset, this.scene.padding + this.scene.radius);
    this.context.arc(this.scene.cx, this.scene.cy, this.scene.radius - Tracker.innerDelta - offset, 0, this.loadingAngle, false);

    this.context.stroke();
    this.context.restore();
  },

  getTicks: function (count, size, animationParams) {
    size = 10;
    var ticks = this.getTickPoitns(count);
    var x1, y1, x2, y2, m = [], tick, k;
    var lesser = 160;
    var allScales = [];
    for (var i = 0, len = ticks.length; i < len; ++i) {
      var coef = 1 - i / (len * 2.5);
      var delta = ((this.frequencyData[i] || 0) - lesser * coef) * this.scene.scaleCoef;
      if (delta < 0) {
        delta = 0;
      }
      tick = ticks[i];
      if (animationParams[0] <= tick.angle && tick.angle <=  animationParams[1]) {
        k = this.scene.radius / (this.scene.radius - this.getSize(tick.angle, animationParams[0], animationParams[1]) - delta);
      } else {
        k = this.scene.radius / (this.scene.radius - (size + delta));
      }
      x1 = tick.x * (this.scene.radius - size);
      y1 = tick.y * (this.scene.radius - size);
      x2 = x1 * k;
      y2 = y1 * k;
      m.push({ x1: x1, y1: y1, x2: x2, y2: y2 });
      if (i < 20) {
        var scale = delta / 50;
        scale = scale < 1 ? 1 : scale;
        allScales.push(scale);
      }
    }
    var sum = allScales.reduce(function(pv, cv) { return pv + cv; }, 0) / allScales.length;
    this.canvas.style.transform = 'scale('+sum+')';
    return m;
  },

  getSize: function (angle, l, r) {
    var m = (r - l) / 2;
    var x = (angle - l);
    var h;

    if (x == m) {
      return this.maxTickSize;
    }
    var d = Math.abs(m - x);
    var v = 70 * Math.sqrt(1 / d);
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

    getTickPoitns: function (count) {
      var coords = [], step = this.PI / count;
      for (var deg = 0; deg < this.PI; deg += step) {
        var rad = deg * Math.PI / (this.PI / 2);
        coords.push({ x: Math.cos(rad), y: -Math.sin(rad), angle: deg });
      }
      return coords;
    }
};
'use strict';

var Tracker = {

  innerDelta: 20,

  lineWidth: 7,

  prevAngle: 0.5,

  angle: 0,

  animationCount: 10,

  pressButton: false,

  init: function (scene) {
      this.scene = scene;
      this.context = scene.context;
  },


  draw: function () {
    if (!Analyser.source.buffer) {
      return;
    }
    if (!this.pressButton) {
      this.angle = Analyser.context.currentTime / Analyser.source.buffer.duration * 2 * Math.PI || 0;
    }
    this.drawArc();
  },

  drawArc: function () {
    this.context.save();
    this.context.strokeStyle = 'rgba(254, 67, 101, 0.8)';
    this.context.beginPath();
    this.context.lineWidth = this.lineWidth;

    this.r = this.scene.radius - (this.innerDelta + this.lineWidth / 2);
    this.context.arc(
      this.scene.radius + this.scene.padding,
      this.scene.radius + this.scene.padding,
      this.r, 0, this.angle, false
    );
    this.context.stroke();
    this.context.restore();
  },

};
'use strict';

var Scene = {

  padding: 120,

  minSize: 740,

  optimiseHeight: 982,

  _inProcess: false,

  init: function () {
    this.canvasConfigure();
    this.initHandlers();

    Framer.init(this);
    Tracker.init(this);

    this.startRender();
  },

  canvasConfigure: function () {
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');
    this.context.strokeStyle = '#FE4365';
    this.calculateSize();
  },

  calculateSize: function () {
    this.scaleCoef = Math.max(0.5, 740 / this.optimiseHeight);

    var size = Math.max(this.minSize, 1/*document.body.clientHeight */);
    this.canvas.setAttribute('width', size);
    this.canvas.setAttribute('height', size);
    //this.canvas.style.marginTop = -size / 2 + 'px';
    //this.canvas.style.marginLeft = -size / 2 + 'px';

    this.width = size;
    this.height = size;

    this.radius = (size - this.padding * 2) / 2;
    this.cx = this.radius + this.padding;
    this.cy = this.radius + this.padding;
    this.coord = this.canvas.getBoundingClientRect();
  },

  initHandlers: function () {
    var that = this;
    window.onresize = function () {
      that.canvasConfigure();
      Framer.configure();
      that.render();
    };
  },

  render: function () {
    var that = this;
    requestAnimationFrame(function () {
      that.clear();
      that.draw();
      if (that._inProcess) {
        that.render();
      }
    });
  },

  clear: function () {
    this.context.clearRect(0, 0, this.width, this.height);
  },

  draw: function () {
    Framer.draw();
    Tracker.draw();
  },

  startRender: function () {
    this._inProcess = true;
    this.render();
  },

  stopRender: function () {
    this._inProcess = false;
  },

  inProcess: function () {
    return this._inProcess;
  }
};
'use strict';

export const Analyser = {

  buffer: null,

  duration: 0,

  init: function () {
    this.context = context; // from Web Audio constant
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

  initHandlers: function () {
    var that = this;

    this.javascriptNode.onaudioprocess = function() {
      Framer.frequencyData = new Uint8Array(that.analyser.frequencyBinCount);
      that.analyser.getByteFrequencyData(Framer.frequencyData);
    };
  }
};

window.addEventListener('DOMContentLoaded', () => {
  Analyser.init();
});

const Analyzer = () => (
  <div className="Analyzer">
    <canvas />
  </div>
);

export default Analyzer;
