angular.module('smartfarming').controller('GoogleChartController', function($scope, $http, $routeParams){

  $scope.chartTitle = "Histórico de Temperatura";
  var uri = '/api/fazenda/{id}/temperatura';
  var id = $routeParams.id;
  $scope.fazenda = $routeParams.fazenda;
  $scope.mostraMenu = true;
  uri = uri.replace('{id}', id);

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
