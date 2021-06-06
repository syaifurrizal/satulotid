$(function(){
  var sheetUrl = 'https://spreadsheets.google.com/feeds/cells/1mnD3sOuSLHxSjUOmNKM0Sl-XNDJFxuoTjkW7peu9PmM/1/public/full?alt=json';
  $.getJSON(sheetUrl, function(data){
    var entry = data.feed.entry;

    //console.log(entry);

    var tanggal = []; // the leftmost column of the Google Sheets
    var ekuitas = []; // second-left column
    var ihsg = []; // third-left column
    var selisih = []; // last column

    var i;
    for (var i = 0; i < entry.length; i += 4){
      // entry[i].content.$t retrieves the content of each cell
      if(i >= 3 ){
        tanggal.push(entry[i].content.$t);
        ekuitas.push(entry[i+1].content.$t * 100);
        ihsg.push(entry[i+2].content.$t * 100);
        selisih.push(entry[i+3].content.$t * 100);
      }
    }

    var ctx = document.getElementById("weeklyChart").getContext('2d');
    var weeklyChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: tanggal,
        datasets: [{
          label: 'ekuitas',
          fill: false,
          data: ekuitas,
          borderColor: '#4a86e8',
          borderWidth: 1,
          pointStyle: 'circle',
          pointRadius: 2,
          backgroundColor: '#4a86e8',
        },{
          label: 'ihsg',
          fill: false,
          data: ihsg,
          borderColor: '#c53929',
          borderWidth: 1,
          pointStyle: 'rect',
          pointRadius: 2,
          backgroundColor: '#c53929',
        },{
          label: 'selisih',
          fill: false,
          data: selisih,
          borderColor: '#999999',
          borderWidth: 1,
          pointStyle: 'triangle',
          pointRadius: 2,
          backgroundColor: '#999999',
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        title: {
          display: true,
          text: 'NAB Portfolio IndoPremier (beta)',
        },
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              var label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y.toPrecision(2) + '%';
              }
              return label;
            }
          },
          usePointStyle: true,
        },
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: 'month',
            round: 'day',
            tooltipFormat: 'DD MMM YY',
          },
          ticks: {
            // For a category axis, the val is the index so the lookup via getLabelForValue is needed
            callback: function(val, index) {
              // Hide the label of every 2nd dataset
              return index % 2 === 0 ? this.getLabelForValue(val) : '';
            },
          }
        },
        y: {
          ticks: {
            // For a category axis, the val is the index so the lookup via getLabelForValue is needed
            callback: function(val, index) {
              // Hide the label of every 2nd dataset
              // return index % 2 === 0 ? this.getLabelForValue(val) : '';
              return val + '%';
            },
          }
        }
      }
    },
  }); // End var weeklyChart ...
  weeklyChart.update();
}) // End $.getJSON ...
}); // End var $(function () ...
