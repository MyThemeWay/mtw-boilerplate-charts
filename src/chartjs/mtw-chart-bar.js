/*! MTW-BOILERPLATE-CHARTS: MTW-CHART-BAR.JS
 * 
 * Author: sitdisch
 * Source: https://github.com/mythemeway
 * License: MIT
 * Copyright: © 2022 sitdisch
 *
 * CHART IS BASED ON:
 * 
 * Bar Chart Border Radius
 * 
 * Original Authors: Chart.js Contributors
 * Source: https://github.com/chartjs/Chart.js/blob/master/docs/samples/bar/border-radius.md
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
  Chart.defaults.font.size = 16;
  Chart.defaults.borderColor = '#64686C';
  Chart.defaults.scale.grid.color = '#30363D';
  
  const NUMBER_CFG = {count: 7, min: -100, max: 100};
  
  var myChart = new Chart(
    canvas,
    {
      type: 'bar',
      
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July'
        ],
        
        datasets: [
          {
            label: 'Fully Rounded',
            data: numbers(NUMBER_CFG),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132, 0.5)',
            hoverBackgroundColor: 'rgb(255, 99, 132, 0.7)',
            borderWidth: 2,
            borderSkipped: false,
            borderRadius: Number.MAX_VALUE
          },
          
          {
            label: 'Small Radius',
            data: numbers(NUMBER_CFG),
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgb(54, 162, 235, 0.5)',
            hoverBackgroundColor: 'rgb(54, 162, 235, 0.7)',
            borderWidth: 2,
            borderSkipped: false,
            borderRadius: 5
          }
        ]
      },
      
      options: {
        maintainAspectRatio: false,
        
        plugins: {
          legend: {
            display: false
          },
          
          title: {
            display: true,
            text: 'mtw-chart-bar'
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
