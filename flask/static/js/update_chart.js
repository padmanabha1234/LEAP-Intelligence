let chart = new Chart(document.getElementById('oeeChart'), {
  type: 'line',
  data: {
    labels: [],  // Initially, the chart has no data
    datasets: [{
      label: 'Time vs Parameter',
      data: [],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  },
  options: {
    scales: {
      x: {},
      y: {
        min: 0,
        max: 100,
      }
    }
  }
});

let an_low = 0;
let an_high = 100;

function updateChart() {
  let machine = $('#machineSelect').val();
  let shift = $('#shiftSelect').val();
  let param = $('#paramSelect').val();

  $.getJSON('/flask/get_anomaly_values', {
    column: param
  }, function(data) {
    an_low = data.low;
    an_high = data.high;
    console.log(data);
  });

  console.log('Anomaly High ->', an_high);
  console.log('Anomaly Low ->', an_low);

  if (machine && shift) {
    $.getJSON('/flask/get_oee_value', {
      machine: machine,
      shift: shift
    }, function(data) {
      console.log('Data ->', data);
      let time = data['time'];

      if (time != null) {
        console.log('Entering...');
        console.log('New time:', time);

        if (chart.data.labels.length > 20) {
          console.log('Removing first data point');
          chart.data.labels.shift(); // remove first label
          chart.data.datasets.forEach((dataset) => {
            dataset.data.shift(); // remove first data point
            dataset.pointBackgroundColor.shift();
            dataset.pointRadius.shift();
          });
        }

        chart.data.labels.push(time);
        chart.data.datasets.forEach((dataset) => {
          let ret = check_alerts(data[param], time); // 1 for threshold, 2 for anomaly, 0 for no alerts
          dataset.pointBackgroundColor = dataset.pointBackgroundColor || [];
          dataset.pointRadius = dataset.pointRadius || [];

          if (ret == 1) {
            dataset.pointBackgroundColor.push('red');
            dataset.pointRadius.push(3);
            dataset.data.push(data[param]);
          } else if (ret == 2) {
            dataset.pointBackgroundColor.push('blue');
            dataset.pointRadius.push(4);
            dataset.data.push(data[param]);
          } else {
            dataset.pointBackgroundColor.push('green');
            dataset.pointRadius.push(1);
            dataset.data.push(data[param]);
          }
        });

        // Update the chart label
        chart.data.datasets[0].label = 'Time vs ' + param;

        chart.update();
      }
    });
  } else {
    console.log('Machine or shift not selected.');
  }
}

function resetChart() {
  $.getJSON('/flask/reset');
  chart.destroy();
  chart = new Chart(document.getElementById('oeeChart'), {
    type: 'line',
    data: {
      labels: [],  // Initially, the chart has no data
      datasets: [{
        label: 'Time vs Parameter',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      scales: {
        x: {},
        y: {
          min: 0,
          max: 100,
        }
      }
    }
  });

  updateChart();
}


$.getJSON('/flask/get_correlation_values', function(response) {
  console.log(response);  // logs: 12345
}).fail(function(error) {
  console.log(error);
});

// Update chart when dropdowns change
$('#machineSelect').change(resetChart);
$('#shiftSelect').change(resetChart);
$('#paramSelect').change(resetChart);

// Initial chart update
// updateChart();

setInterval(updateChart, 1000);  // Update the chart every second

$(document).ready(function() {
  // Fetch data and populate dropdowns when the page loads
  $.getJSON("/flask/get_dropdown_data", function(data) {
    var dateSelect = $("#date-select");
    var machineSelect = $("#machine-select");
    var shiftSelect = $("#shift-select");
    var timeSelect = $("#time-select");
    var m = $("#machineSelect");
    var s = $("#shiftSelect");

    // Clear any existing options
    dateSelect.empty();
    machineSelect.empty();
    shiftSelect.empty();
    timeSelect.empty();

    // Populate the date dropdown
    data.dates.forEach(function(date) {
      dateSelect.append(new Option(date, date));
    });

    // Populate the machine dropdown
    data.machines.forEach(function(machine) {
      machineSelect.append(new Option(machine, machine));
      m.append(new Option(machine, machine));
    });

    // Populate the shift dropdown
    data.shifts.forEach(function(shift) {
      shiftSelect.append(new Option(shift, shift));
      s.append(new Option(shift, shift));
    });

    // Populate the time dropdown
    data.times.forEach(function(time) {
      timeSelect.append(new Option(time, time));
    });
  });
});

// Event handler for Manual Alerts button click
const manualAlertsButton = document.getElementById('manual-alerts-button');
const IncSubmitButton = document.getElementById('inc_submit');
const incidentDiv = document.getElementById('incident');

manualAlertsButton.addEventListener('click', function() {
  incidentDiv.style.display = 'block';
});

IncSubmitButton.addEventListener('click', function() {
  incidentDiv.style.display = 'none';
});

// Popup for Alert
document.getElementById('inc_submit').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent form submission (for demonstration purposes)

  // Get form values
  var dateSelect = document.getElementById('date-select').value;
  var machineSelect = document.getElementById('machine-select').value;
  var shiftSelect = document.getElementById('shift-select').value;
  var timeSelect = document.getElementById('time-select').value;
  var incidentSelect = document.getElementById('incident-select').value;
  var descriptionText = document.getElementById('description-text').value;

  // Perform actions with the form values
  console.log('Form submitted!');
  console.log('Date: ' + dateSelect);
  console.log('Machine: ' + machineSelect);
  console.log('Shift: ' + shiftSelect);
  console.log('Time: ' + timeSelect);
  console.log('Incident: ' + incidentSelect);
  console.log('Description: ' + descriptionText);

  // Close the modal dialog
  $('#incidentModal').modal('hide');
});

function check_alerts(value, time) {
  // Check the condition for high-th
  if (value > an_high) {
    addNotification('Higher Anomaly', 'Anamalous Value ' + value + ' at ' + time + ' is high');
    return 2;
  }
  if (value < an_low) {
    addNotification('Lower Anomaly', 'Anamalous Value ' + value + ' at ' + time + ' is low');
    return 2;
  }

  if (value > $('#high').val()) {
    addNotification('Higher Threshold', 'Value ' + value + ' at ' + time + ' exceeds high threshold');
    return 1;
  }
  if (value < $('#low').val()) {
    addNotification('Lower Threshold', 'Value ' + value + ' at ' + time + ' is less than lower threshold');
    return 1;
  }

  return 0;
}

// Correlation Chart

const correlationChartCanvas = document.getElementById('correlationChart');

function generateCorrelationChart(data) {
  const labels = data.map(entry => `${entry.column1} - ${entry.column2} ${Math.round(entry.correlation * 100)}%`);
  const values = data.map(entry => Math.round(entry.correlation * 100)); // Convert the values to whole numbers

  const correlationChart = new Chart(correlationChartCanvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: '',
          data: values,
          backgroundColor: values.map(value => value < 0 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 128, 0, 0.5)'), // Grey for negative values, green for positive values
          borderColor: values.map(value => value < 0 ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 128, 0, 1)'), // Grey for negative values, green for positive values
          borderWidth: 1,
        },
      ],
    },
    options: {
      indexAxis: 'y', // Display the chart horizontally
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
        },
      },
      plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    },
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const tab2Link = document.querySelector('a[href="#tab2"]');
  tab2Link.addEventListener('click', function() {
    // Fetch and display the correlation values
    fetch('/flask/get_correlation_values')
      .then(response => response.json())
      .then(data => {
        generateCorrelationChart(data);
      })
      .catch(error => {
        console.error('Error fetching correlation values:', error);
      });
  });
});

// Tab 2

document.addEventListener('DOMContentLoaded', function() {
  const tab2Link = document.querySelector('a[href="#tab2"]');
  const connectForm = document.getElementById('connectForm');

  tab2Link.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the tab switch

    // Fetch and display the correlation values
    fetch('/flask/get_correlation_values')
      .then(response => response.json())
      .then(data => {
        generateCorrelationChart(data);
      })
      .catch(error => {
        console.error('Error fetching correlation values:', error);
      });
  });

  connectForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    // Handle the connect button click event here
    // Add your code to connect to the desired functionality
    // For example, initiate a connection or perform an action
  });
});


// Trend Analysis
//TAB --- 3
let responseData;
var param = $('#param').val(); // Default parameter name

document.getElementById('trendForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var formData = new FormData(this);

  // Update the param variable with the selected parameter
  param = formData.get('param');
  fetch('/flask/trend_check', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log("THE data is here::::", data);
      responseData = data;

      document.getElementById('tableContainer').innerHTML = generateTable(data.results);
      document.getElementById('chartContainer').innerHTML = '';

      for (var i = 0; i < data.length; i++) {
        var row = data[i];
        var dateValue = row[1];
        var machineValue = row[2];
        var shiftValue = row[3];
        var paramValue = row[param];

        var grapData = responseData.grap_data[i];
        var xAxisIndices = Array.from({ length: grapData[param].length }, (_, index) => index);

        var chartContainer = document.createElement('div');
        chartContainer.id = 'chart_' + i;
        document.getElementById('chartContainer').appendChild(chartContainer);
        var chartData = xAxisIndices.map(index => ({ x: new Date(grapData.dates[index]), y: grapData[param][index] }));

        var startDate = new Date(dateValue);
        var endDate = new Date(dateValue);
        startDate.setDate(startDate.getDate() - 5);
        endDate.setDate(endDate.getDate() + 5);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
});



// Function to generate the response table
function generateTable(data) {
  var tableHTML = '<table class="table table-bordered">' +
    '<thead><tr><th>SI No</th><th>Date</th><th>Machine</th><th>Shift</th><th>Show Graphs</th></tr></thead><tbody>';

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var serialNumber = i + 1; // Serial number starts from 1
    var dateValue = row[1];
//    console.log(dateValue)
    var machineValue = row[2];
    var shiftValue = row[3];

    tableHTML += '<tr>' +
      '<td>' + serialNumber + '</td>' +
      '<td>' + dateValue + '</td>' +
      '<td>' + machineValue + '</td>' +
      '<td>' + shiftValue + '</td>' +
      '<td><button onclick="handleButtonClick(' + i + ', \'' + param + '\')" class="btn btn-primary">Show Graph</button></td>' +
      '</tr>';
  }

  tableHTML += '</tbody></table>';
  return tableHTML;
}



// Updated handleButtonClick function
function handleButtonClick(index, param) {
  var row = responseData.results[index];
  var grapData = responseData.grap_data[index];
  var dates = grapData.dates;
  var paramValues = grapData[param];

  var modalChartContainer = document.getElementById('modalChartContainer');
  modalChartContainer.innerHTML = ''; // Clear previous graph content

  var chartContainer = document.createElement('canvas');
  chartContainer.id = 'chart_' + index + '_modal';
  modalChartContainer.appendChild(chartContainer);

  var numDays = parseInt(document.getElementById('days').value); // Get user input for number of days

  var chartData = {
    labels: dates,
    datasets: [{
      label: param,
      data: paramValues,
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0)',
      fill: true,
      pointRadius: 5,
      pointBackgroundColor: function(context) {
        var dataIndex = context.dataIndex;
        var currentDate = new Date(dates[dataIndex]);
        var responseDate = new Date(row[1]);
        var daysDifference = Math.abs((currentDate - responseDate) / (1000 * 60 * 60 * 24));

        if (daysDifference <= numDays && currentDate <= responseDate) { // Compare with user input
          return 'red'; // Set red color for points within specified days before response date
        }

        return 'rgba(75, 192, 192, 0.2)'; // Default color for other points
      },
    }]
  };

  var chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Line Chart'
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MM/DD/YY'
          }
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20 // Adjust as needed
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Value'
        }
      }]
    }
  };

  new Chart(chartContainer, {
    type: 'line',
    data: chartData,
    options: chartOptions
  });

  // Show the modal and center it
  var modal = new bootstrap.Modal(document.getElementById('graphModal'), { backdrop: 'static' });
  modal.show();
}


// Forecasting
$('#tab4 form').submit(function(event) {
  event.preventDefault(); // Prevent the form from submitting normally

  // Get the selected values
  let machine = $('#machineSelectTab4').val();
  let shift = $('#shiftSelectTab4').val();
  let parameter = $('#paramSelectTab4').val();

  // Perform actions with the selected values
  console.log('Form submitted!');
  console.log('Machine: ' + machine);
  console.log('Shift: ' + shift);
  console.log('Parameter: ' + parameter);

  // Make a request to retrieve the forecasted data
  $.getJSON('/flask/forecasting', {
    machine: machine,
    shift: shift,
    parameter: parameter,
    forecast_steps: 10  // Set a default value for forecast_steps
  }, function(data) {
    // Prepare the data for the chart
    if (Array.isArray(data.data)) {
      // Prepare the data for the chart
      let dates = [];
      let actualValues = [];
      let forecastedValues = [];

      data.data.forEach(function(item) {
        dates.push(item.Date);
        actualValues.push(item['Actual Values']);
        forecastedValues.push(item['Forecasted Values']);
      });

      // Create the chart using Chart.js
      let chartData = {
        labels: dates,
        datasets: [
          {
            label: 'Actual Values',
            data: actualValues,
            fill: false,
            borderColor: 'blue',
            tension: 0.1
          },
          {
            label: 'Forecasted Values',
            data: forecastedValues,
            fill: false,
            borderColor: 'grey',
            borderDash: [5, 5],
            tension: 0.1
          }
        ]
      };

      // Configure chart options
      let chartOptions = {
        scales: {
          x: {},
          y: {
            min: 0,
            max: 100
          }
        }
      };

      // Create or update the chart instance
      if (window.myChart) {
        // Update existing chart
        window.myChart.data = chartData;
        window.myChart.options = chartOptions;
        window.myChart.update();
      } else {
        // Create new chart
        let ctx = document.getElementById('forecasting').getContext('2d');
        window.myChart = new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: chartOptions
        });
      }
    } else {
      console.log('Invalid data format:', data);
    }
  });
});



