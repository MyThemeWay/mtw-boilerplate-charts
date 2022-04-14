/*! MTW-BOILERPLATE-CHARTS: MTW-CHART-BUBBLE.JS
 * 
 * Author: sitdisch
 * Source: https://github.com/mythemeway
 * License: MIT
 * Copyright: © 2022 sitdisch
 *
 * CHART IS BASED ON:
 * 
 * Bubble Chart & Quadrants
 * 
 * Original Authors: Chart.js Contributors
 * Sources: 
   * https://github.com/chartjs/Chart.js/blob/master/docs/samples/scriptable/bubble.md
   * https://github.com/chartjs/Chart.js/blob/master/docs/samples/plugins/quadrants.md
 * License: MIT
 * Copyright: © 2014-2022 Chart.js Contributors
 * Changes: made
 */

"use strict";

import Chart from 'chart.js/auto';
import { srand, generateData, channelValue, colorize, quadrants } from './utils.js';

(() => {
  const canvas = document.getElementById(MTW_CANVAS_ID);
  
  canvas.style.backgroundColor='#1A252F';
  
  Chart.defaults.color = '#C9D1D9';
  Chart.defaults.plugins.title.color = '#CED5DC';
  Chart.defaults.plugins.title.font.size = 19;
  Chart.defaults.font.size = 16;
  Chart.defaults.borderColor = '#64686C';
  Chart.defaults.scale.grid.color = '#30363D';
  
  var delayed;
  
  const DATA_COUNT = 16;
  const MIN_XY = -150;
  const MAX_XY = 100;
  
  srand(110);
  
  const config = {
    type: 'bubble',
    
    data: {
      datasets: [{
        data: generateData(DATA_COUNT,MIN_XY,MAX_XY)
      }, {
        data: generateData(DATA_COUNT,MIN_XY,MAX_XY)
      }]
    },
    
    options: {
      maintainAspectRatio: false,
      
      plugins: {
        legend: false,
        
        title: {
          display: true,
          text: 'mtw-chart-bubble'
        },
        
        quadrants: {
          topLeft: '#1A252F',
          topRight: '#17212a',
          bottomRight: '#1A252F',
          bottomLeft: '#17212a',
        }
      },
      
      animation: {
        onComplete: () => {
          delayed = true;
        },
        
        delay: (context) => {
          let delay = 0;
          
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          
          return delay;
        },
      },
      
      elements: {
        point: {
          backgroundColor: colorize.bind(null, false),

          borderColor: colorize.bind(null, true),

          borderWidth: (context) => {
            return Math.min(Math.max(1, context.datasetIndex + 1), 8);
          },

          radius: (context) => {
            const size = context.chart.width;
            const base = Math.abs(context.raw.v) / 1000;
            return (size / 24) * base;
          }
        }
      },
      
    },
    plugins: [quadrants]
  }
  
  var myChart = new Chart(canvas,config);
  
  window.addEventListener('resize', () => {
    myChart.options.animation = false;
    myChart.destroy();
    myChart = new Chart(canvas,config);
    myChart.options.animation = true;
  });
  
  setInterval(() => {
    for (const dataset of myChart.data.datasets) {
      dataset.data = generateData(DATA_COUNT,MIN_XY,MAX_XY);
    }
    
    myChart.update();
  }, 7500);
})();
