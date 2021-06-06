// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawSheetName);

// Ingest Data from Google Sheets
// resource: https://developers.google.com/chart/interactive/docs/spreadsheets#sheet-name

// Callback that creates and populates a data table,
// instantiates chart, passes in the data and
// draws it.
function drawSheetName() {
  var queryString = encodeURIComponent('SELECT A, B, C, D, E, F, G');

  var query = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1QL2_uEuPvGQZZto28ZCcJWHPddImgNM0BRv62mzDf2s/gviz/tq?sheet=Data&headers=1&tq=' + queryString);
    query.send(handleSampleDataQueryResponse);
  }

  function handleSampleDataQueryResponse(response) {
    if (response.isError()) {
      alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
      return;
    }

//function drawChart() {
    var data = response.getDataTable();

    var options = {
      'title': '% YTD NAB Portfolio IndoPremier (beta)',
      'height': 300,
      'legend': 'bottom',
      'vAxis': {format: '#.##%',},
      'hAxis': {format: 'MMM YYYY'},
      'colors': ['#d3d3d3', '#c53929', '#4a86e8'],
      'backgroundColor': 'transparent',
      'focusTarget': 'category',
    };

    var view = new google.visualization.DataView(data);
    view.setColumns([0,1,{sourceColumn: 2, type: "string", role:"annotation"},3,{sourceColumn: 4, type: "string", role:"annotation"},5,{sourceColumn: 6, type: "string", role:"annotation"}]);

    var formatter = new google.visualization.NumberFormat({format: '#.##%'});
    formatter.format(view,1);
    formatter.format(view,3);
    formatter.format(view,5);

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(view, options);
  //}
  }
