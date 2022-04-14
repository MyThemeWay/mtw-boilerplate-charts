/*! MTW-BOILERPLATE-CHARTS: MTW-CHART-LINE.JS
 * 
 * Author: sitdisch
 * Source: https://github.com/mythemeway
 * License: MIT
 * Copyright: © 2022 sitdisch
 *
 * CHART IS BASED ON:
 * 
 * v3anims.js
 * 
 * Original Authors: Chart.js Contributors
 * Source: https://github.com/chartjs/www.chartjs.org/blob/master/src/charts/v3anims.js
 * License: MIT
 * Copyright: © 2014-2022 Chart.js Contributors
 * Changes: made
 */

"use strict";

import Chart from 'chart.js/auto';
import { randomDataSet, previousY } from './utils.js';

(() => {
  const canvas = document.getElementById(MTW_CANVAS_ID);
  
  canvas.style.backgroundColor='#1A252F';
  
  Chart.defaults.color = '#C9D1D9';
  Chart.defaults.plugins.title.color = '#CED5DC';
  Chart.defaults.plugins.title.font.size = 19;
  Chart.defaults.font.size = 16;
  Chart.defaults.borderColor = '#64686C';
  Chart.defaults.scale.grid.color = '#30363D';
  
  const DATA_COUNT = 100;
  const TOTALDURATION = 5000;
  const delayBetweenPoints = TOTALDURATION / DATA_COUNT;
  
  var myChart = new Chart(
    canvas,
    {
      type: 'line',
      
      data: {
        datasets: [
          {
            borderColor: 'rgb(255, 99, 132)',
            data: randomDataSet(DATA_COUNT),
            
            animations: {
              x: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: NaN, // the point is initially skipped
                
                delay(ctx) {
                  if (ctx.type !== 'data') {
                    return 0;
                  }
                  
                  return ctx.index * delayBetweenPoints;
                }
              },
              
              y: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: previousY,
                
                delay(ctx) {
                  if (ctx.type !== 'data') {
                    return 0;
                  }
                  
                  return ctx.index * delayBetweenPoints;
                }
              }
            }
          },
          
          {
            borderColor: 'rgb(75, 192, 192)',
            data: randomDataSet(DATA_COUNT),
            
            animations: {
              borderWidth: {
                easing: 'linear',
                from: 1,
                loop: true
              }
            }
          },
          
          {
            borderColor: 'rgb(255, 205, 86)',
            borderWidth: 1,
            data: randomDataSet(DATA_COUNT),
            tension: 1,
            
            animations: {
              tension: {
                type: 'number',
                duration: 1000,
                easing: 'linear',
                from: 0,
                to: 1,
                loop: true
              }
            }
          },
          
          {
            borderColor: 'rgb(54, 162, 235)',
            data: randomDataSet(DATA_COUNT),
            
            animations: {
              x: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: NaN, // the point is initially skipped
                
                delay(ctx) {
                  if (ctx.type !== 'data') {
                    return 0;
                  }
                  
                  return (100 - ctx.index) * delayBetweenPoints;
                }
              },
              
              y: {
                type: 'number',
                easing: 'linear',
                duration: delayBetweenPoints,
                from: previousY,
                
                delay(ctx) {
                  if (ctx.type !== 'data') {
                    return 0;            

                  }
                  
                  return (100 - ctx.index) * delayBetweenPoints;
                }
              }
            }
          }
        ]
      },
      
      options: {
        maintainAspectRatio: false,
        radius: 0,
        
        animations: {
          y: {
            delay: (context) => 1000 * context.datasetIndex,
            easing: 'easeInOutElastic',
            
            from: (context) => {
              if (context.type === 'data') {
                if (context.mode === 'default' && !context.dropped) {
                  context.dropped = true;
                  return -10;
                }
              }
            }
          }
        },
        
        interaction: {
          mode: 'x',
          intersect: false
        },
        
        plugins: {
          legend: false,
        
          title: {
            display: true,
            text: 'mtw-chart-line'
          }
        },
        
        scales: {
          x: {
            type: 'linear',
            bounds: 'data'
          },
          
          y: {
            type: 'linear',
          }
        }
      }
    }
  );
  
  setInterval(() => {
    for (const dataset of myChart.data.datasets) {
      dataset.data = randomDataSet(DATA_COUNT);
    }
    
    myChart.update();
  }, 10000);
  
})();
