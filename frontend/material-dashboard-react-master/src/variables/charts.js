// ##############################
// // // javascript library for creating charts
// #############################
var Chartist = require("chartist");

// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

// ##############################
// // // Daily Sales
// #############################

const prediction = {
  Rice: [3980.817875575284],
  Maize: [3765.412436131881],
  Wheat: [4284.222170711171],
  // Jowar: [994.6005362119232],
  // Bajra: [1024.8444465881278],
  // "Small Millets": [343.4729673399856],
  // Barley: [3670.198683869752],
  "Total Cereals": [4015.471788284525],
  // Tur: [921.781910586989],
  // Gram: [1156.2851350571168],
  // "Other Pulses": [921.3608186297648],
  // "Total Pulses": [867.8835059460705],
  "Total Foodgrains": [4164.050670316273],
  // Groundnuts: [1707.8254528837815],
  // Sesamum: [373.63239175191615],
  // Rapeseed: [1285.9805148148896],
  // Linseed: [497.48986642843374],
  // "Total Oilseeds": [1319.0289556516698],
  // Sugarcane: [71805.5837375347],
  // Cotton: [511.27535910831824],
  // Banana: [569.6340309301323],
  // Potato: [251.1174751703313],
  // Chillies: [16.673209068414636],
  // Turmeric: [35.536368199601256],
  // Moong: [831.088438963751]
};

const predLabel = [];
const predQuant = [];

Object.keys(prediction).forEach((key) => {
  predLabel.push(key);
  predQuant.push(prediction[key][0]);
})

const dailySalesChart = {
  data: {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    series: [[12, 17, 7, 17, 23, 18, 38]]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  // for animation
  animation: {
    draw: function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

// ##############################
// // // Email Subscriptions
// #############################

const emailsSubscriptionChart = {
  data: {
    labels: predLabel,
    series: [
      predQuant,
    ]
  },
  options: {
    axisX: {
      showGrid: false
    },
    low: 3000,
    high: 5000,
    chartPadding: {
      top: 0,
      right: 5,
      bottom: 0,
      left: 0
    }
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function(value) {
            return value[0];
          }
        }
      }
    ]
  ],
  animation: {
    draw: function(data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

// ##############################
// // // Completed Tasks
// #############################

const completedTasksChart = {
  data: {
    labels: ["18Q1", "18Q2", "18Q3", "18Q4", "19Q1", "19Q2", "19Q3", "19Q4"],
    series: [[230, 750, 450, 300, 280, 240, 200, 124]]
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0
    }),
    low: 0,
    high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  },
  animation: {
    draw: function(data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

module.exports = {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
};
