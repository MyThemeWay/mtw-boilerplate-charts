/*! MTW-BOILERPLATE-CHARTS: UTILS.JS
 * 
 * Author: sitdisch
 * Source: https://github.com/mythemeway
 * License: MIT
 * Copyright: © 2022 sitdisch
 *
 * UTILITIES ARE BASED ON:
 * 
 * utils.js, Bubble Chart, v3anims.js & Quadrants
 * 
 * Original Author: Chart.js Contributors
 * Sources: 
   * https://github.com/chartjs/Chart.js/blob/master/docs/scripts/utils.js
   * https://github.com/chartjs/Chart.js/blob/master/docs/samples/scriptable/bubble.md
   * https://github.com/chartjs/www.chartjs.org/blob/master/src/charts/v3anims.js
   * https://github.com/chartjs/Chart.js/blob/master/docs/samples/plugins/quadrants.md
 * License: MIT
 * Copyright: © 2014-2022
 * Changes: made
 */

"use strict";

import { valueOrDefault } from 'chart.js/helpers';

// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
var _seed = Date.now();

export function srand(seed) {
  _seed = seed;
}

export function rand(min, max) {
  min = valueOrDefault(min, 0);
  max = valueOrDefault(max, 0);
  _seed = (_seed * 9301 + 49297) % 233280;
  return min + (_seed / 233280) * (max - min);
}

export function numbers(config) {
  var cfg = config || {};
  var min = valueOrDefault(cfg.min, 0);
  var max = valueOrDefault(cfg.max, 100);
  var from = valueOrDefault(cfg.from, []);
  var count = valueOrDefault(cfg.count, 8);
  var decimals = valueOrDefault(cfg.decimals, 8);
  var continuity = valueOrDefault(cfg.continuity, 1);
  var dfactor = Math.pow(10, decimals) || 0;
  var data = [];
  var i, value;

  for (i = 0; i < count; ++i) {
    value = (from[i] || 0) + rand(min, max);
    if (rand() <= continuity) {
      data.push(Math.round(dfactor * value) / dfactor);
    } else {
      data.push(null);
    }
  }

  return data;
}

export function generateData(count,min_xy,max_xy) {
  const data = [];
  let i;

  for (i = 0; i < count; ++i) {
    data.push({
      x: rand(min_xy, max_xy),
      y: rand(min_xy, max_xy),
      v: rand(0, 1000)
    });
  }

  return data;
}

export function randomDataSet(count) {
  var dataset = [];
  let prev = Math.random() * 100;

  for (let i = 0; i < count; i++) {
    prev += 5 - Math.random() * 10;
    dataset.push({x: i, y: prev});
  }

  return dataset;
}
  
export function channelValue(x, y, values) {
  return x < 0 && y < 0 ? values[0] : x < 0 ? values[1] : y < 0 ? values[2] : values[3];
}

export function colorize(opaque, context) {
  const value = context.raw;
  const x = value.x / 100;
  const y = value.y / 100;
  const r = channelValue(x, y, [250, 150, 50, 0]);
  const g = channelValue(x, y, [0, 50, 150, 250]);
  const b = channelValue(x, y, [0, 150, 150, 250]);
  const a = opaque ? 1 : 0.5 * value.v / 1000;

  return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

export const quadrants = {
  id: 'quadrants',
  
  beforeDraw(chart, args, options) {
    const {ctx, chartArea: {left, top, right, bottom}, scales: {x, y}} = chart;
    const midX = x.getPixelForValue(0);
    const midY = y.getPixelForValue(0);
    ctx.save();
    ctx.fillStyle = options.topLeft;
    ctx.fillRect(left, top, midX - left, midY - top);
    ctx.fillStyle = options.topRight;
    ctx.fillRect(midX, top, right - midX, midY - top);
    ctx.fillStyle = options.bottomRight;
    ctx.fillRect(midX, midY, right - midX, bottom - midY);
    ctx.fillStyle = options.bottomLeft;
    ctx.fillRect(left, midY, midX - left, bottom - midY);
    ctx.restore();
  }
};

export const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
