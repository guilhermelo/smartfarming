angular.module('smartfarming').controller('GoogleChartController', function($scope, $http, $routeParams){

  var uri = '/api/fazenda/{id}/temperatura/';
  var id = $routeParams.id;
  uri = uri.replace('{id}', id);

  console.log('URI: ' + uri);
  $scope.chartTitle = "Histórico de Temperatura";

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

      var data = google.visualization.arrayToDataTable(montaVetor(valores));
      var options = {
        title: '',
        curveType: 'function',
        legend: { position: 'bottom' }
      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);
    });
  }

  function montaVetor(valores){

    var vetor = [];

    vetor.push(['Data', 'Temperatura']);

    for (var valor of valores) {
      vetor.push([valor.dtHrRecuperado, parseInt(valor.temperatura)]);
    }

    return vetor;
  }

});
