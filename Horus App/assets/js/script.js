Chart.pluginService.register({
  beforeDraw: function (chart) {
    if (chart.config.options.elements.center) {
      //Get ctx from string
      var ctx = chart.chart.ctx;

      //Get options from the center object in options
      var centerConfig = chart.config.options.elements.center;
      var fontStyle = centerConfig.fontStyle || 'Arial';
      var txt = centerConfig.text;
      var color = centerConfig.color || '#000';
      var sidePadding = centerConfig.sidePadding || 20;
      var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
      //Start with a base font of 30px
      ctx.font = "30px " + fontStyle;

      //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      var stringWidth = ctx.measureText(txt).width;
      var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      var widthRatio = elementWidth / stringWidth;
      var newFontSize = Math.floor(30 * widthRatio);
      var elementHeight = (chart.innerRadius * 2);

      // Pick a new font size so it will not be larger than the height of label.
      var fontSizeToUse = Math.min(newFontSize, elementHeight);

      //Set font settings to draw it correctly.
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      ctx.font = fontSizeToUse+"px " + fontStyle;
      ctx.fillStyle = color;

      //Draw text in center
      ctx6.fillText(txt, centerX, centerY);
      ctx7.fillText(txt, centerX, centerY);
      ctx8.fillText(txt, centerX, centerY);
    }
  }
});


var ctx = document.getElementById('Visitor Count per Hour').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["0900", "1000", "1100", "1200", "1300", "1400", "1500","1600","1700","1800","1900","2000","2100","2200"],
        datasets: [{
            label: "Visitor Count Per Hour",
            backgroundColor: '#ffffcc',
            borderColor: '#ffffff',
            data: [0, 471, 689, 543, 521, 613, 412, 389, 673, 513, 528, 327, 216, 78],
        }]
    },

    // Configuration options go here
    options: {}
});


var ctx2 = document.getElementById('Visitor Count per Day').getContext('2d');
var chart2 = new Chart(ctx2, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [{
            label: "Visitor Count Per Day",
            backgroundColor: '#ccccff',
            borderColor: '#ffffff',
            data: [1693, 1583, 1397, 1737, 2153, 2384, 2093],
        }]
    },

    // Configuration options go here
    options: {}
});

var ctx5 = document.getElementById('Visitor Traffic per Hour').getContext('2d');
var chart5 = new Chart(ctx5, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["0900", "1000", "1100", "1200", "1300", "1400", "1500","1600","1700","1800","1900","2000","2100","2200"],
        datasets: [{
            label: "Visitor Traffic per Hour",
            backgroundColor: '#ffcccc',
            borderColor: '#ffffff',
            data: [156, 236, 127, 57, -147, -54, 47, 191, 84 , -120, -110, 54, -176, -345],
        }]
    },

    // Configuration options go here
    options: {}
});

var ctx1 = document.getElementById('Ratings').getContext('2d');
var chart1 = new Chart(ctx1, {
    type: 'horizontalBar',
    // The data for our dataset
    data: { 
    	labels: ["A", "B", "C", "D", "E"],
        datasets: [{
            label: "Ratings",
            backgroundColor: '#ccffff',
            borderColor: '#ccffff',
            data: [23, 85, 74, 34, 26],
        }]
    },
    // Configuration options go here
    options: {}
});

var ctx3 = document.getElementById('Twitter Sentiment').getContext('2d');
var chart3 = new Chart(ctx3, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: ["Very Positive>0.9", "Positive>0.4", "Slightly Positive>0.0", "Slightly negative>0.0", "Negative>0.4", "Very Negative>0.9"],
        datasets: [{
            label: "Sentiments",
            backgroundColor: ["#ffffe6" , "#ffe6e6", "#fff2e6", "#e6ffe6", "#ebfafa", "#ececf9"],
            borderColor: '#e6e6e6',
            data: [40,48,12,4,22,74],
        }]
    },

    // Configuration options go here
    options: {}
});

var ctx4 = document.getElementById('Average strength of emotions').getContext('2d');
var chart4 = new Chart(ctx4, {
    // The type of chart we want to create
    type: 'polarArea',

    // The data for our dataset
    data: {
        labels: ["Calmness", "Happiness", "Liking", "Agitation", "Anger"],
        datasets: [{
            label: "Average strength of emotions",
            backgroundColor: ["#e6f0ff" , "#e6ffe6", "#ffcccc", "#6c5b7b", "#c06c84"],
            borderColor: '#ffffff',
            data: [1.757, 1.893, 1.929, 0.055, 0.017],
        }]
    },

    // Configuration options go here
    options: {}
});

var ctx8 = document.getElementById('Current Visitors').getContext('2d');
var chart8 = new Chart(ctx8, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
      data: {
        labels: [],
        datasets: [{
            backgroundColor: "#ffffe6",
            data: [100],
        }]
    },
    // Configuration options go here
    options: {  
    elements: {
      center: {
      text: '528',
      color: '#36A2EB', //Default black
      fontStyle: 'Helvetica', //Default Arial
      sidePadding: 15 //Default 20 (as a percentage)
    }
  }}
});

var ctx7 = document.getElementById('Average Buzz among Visitors').getContext('2d');
var chart7 = new Chart(ctx7, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
      data: {
        labels: [],
        datasets: [{
            backgroundColor: "#d0d0e1",
            data: [100],
        }]
    },
    // Configuration options go here
    options: {  
    elements: {
      center: {
      text: '72.6%',
      color: '#36A2EB', //Default black
      fontStyle: 'Helvetica', //Default Arial
      sidePadding: 15 //Default 20 (as a percentage)
    }
  }}
});

var ctx6 = document.getElementById('Average Dwell Time').getContext('2d');
var chart6 = new Chart(ctx6, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
      data: {
        labels: [],
        datasets: [{
            backgroundColor: "#e6ffe6",
            data: [100],
        }]
    },
    // Configuration options go here
    options: {  
    elements: {
      center: {
      text: '4.73mins',
      color: '#36A2EB', //Default black
      fontStyle: 'Helvetica', //Default Arial
      sidePadding: 15 //Default 20 (as a percentage)
    }
  }}
});
