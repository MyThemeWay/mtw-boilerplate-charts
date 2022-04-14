/*! MTW-BOILERPLATE-CHARTS: MTW-CHART-POLAR.JS
 * 
 * Author: sitdisch
 * Source: https://github.com/mythemeway
 * License: MIT
 * Copyright: © 2022 sitdisch
 *
 * CHART IS BASED ON:
 * 
 * Polar Area
 * 
 * Original Authors: Chart.js Contributors
 * Source: https://github.com/chartjs/Chart.js/blob/master/docs/samples/other-charts/polar-area.md
 * License: MIT
 * Copyright: © 2014-2022 Chart.js Contributors
 * Changes: made
 */

"use strict";

import Chart from 'chart.js/auto';
import { numbers } from './utils.js';

(() => {
  const canvas = document.getElementById(MTW_CANVAS_ID);
  
  canvas.style.backgroundColor='#1A252F';
  
  Chart.defaults.color = '#C9D1D9';
  Chart.defaults.plugins.title.color = '#CED5DC';
  Chart.defaults.plugins.title.font.size = 19;
  Chart.defaults.borderColor = '#64686C';
  Chart.defaults.scale.grid.color = '#30363D';
  Chart.defaults.elements.arc.borderAlign = 'inner';
  
  const NUMBER_CFG = {count: 5, min: 0, max: 100};
  
  var myChart = new Chart(
    canvas,
    {
      type: 'polarArea',
      
      data: {
        labels: ['Red', 'Grey', 'Blue', 'Yellow', 'Green'],
        
        datasets: [
          {
            data: numbers(NUMBER_CFG),
            
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(201, 203, 207)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)'
            ],
            
            hoverBackgroundColor: [
              'rgb(255, 99, 132, 0.7)',
              'rgb(201, 203, 207, 0.7)',
              'rgb(54, 162, 235, 0.7)',
              'rgb(255, 205, 86, 0.7)',
              'rgb(75, 192, 192, 0.7)'
            ],
            
            backgroundColor: [
              'rgb(255, 99, 132, 0.5)',
              'rgb(201, 203, 207, 0.5)',
              'rgb(54, 162, 235, 0.5)',
              'rgb(255, 205, 86, 0.5)',
              'rgb(75, 192, 192, 0.5)'
            ],
            
            borderWidth: 2,
            borderRadius: 7
          }
        ]
      },
      
      options: {
        maintainAspectRatio: false,
        
        scales: {
          r: {
            ticks: {
              backdropColor: '#1A252F',
              font: {
                size: 16
              },
              z: 1
            },
            
            pointLabels: {
              display: true,
              centerPointLabels: true,
              font: {
                size: 16
              },
            }
          }
        },
        
        plugins: {
          legend: false,
          
          title: {
            display: true,
            text: 'mtw-chart-polar'
          }
        },
      },
    }
  );
  
  setInterval(() => {
    for (const dataset of myChart.data.datasets) {
      dataset.data = numbers(NUMBER_CFG);
    }
    
    myChart.update();
  }, 3000);
})();
