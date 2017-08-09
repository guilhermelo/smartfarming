angular.module('smartfarming').controller('GoogleChartController', function($scope, $http, $routeParams){

  var uri = '/api/fazenda/{id}/temperatura/';
  var id = $routeParams.id;
  uri = uri.replace('{id}', id);

  console.log('URI: ' + uri);

  var resultados = [];

  $http.get(uri)
      .then(function(result) {
        desenhaGrafico(result.data);
      }, function(erro){
        console.log(erro);
      });

  function desenhaGrafico(valores){

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(function() {

      console.log(valores);

      var data = google.visualization.arrayToDataTable([
          ['Data', 'Temperatura'],
          ['12/04/2017',  14],
          ['13/04/2017',  23],
          ['14/04/2017',  18],
          ['15/04/2017',  21]
      ]);

      var options = {
        title: 'Histórico de Temperatura',
        curveType: 'function',
        legend: { position: 'bottom' }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    });
  }

  function montaVetor(valores){

    var vetor = [];

    vetor[0][0] = 'Data';
    vetor[0][1] = 'Temperatura';

    for (var i = 1; i < valores.length; i++) {
      for (var j = 0; j < 2; j++) {
        vetor[i][j] = i == 0 ? valores['temperatura'] : valores['dtHrRecuperado'];
      }
    }
  }

});
