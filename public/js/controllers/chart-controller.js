angular.module('smartfarming').controller('GoogleChartController', function($scope, $http){

  $scope.temperaturas = [];

  google.load('visualization', '1', {'packages' : ['corechart']});
  google.setOnLoadCallback(desenhaGrafico);

  function desenhaGrafico() {
    var valores = recuperaValores();

    var dados = new google.visualization.DataTable();
    dados.addColumn('number', 'Temperatura');

    dados.addRows(dados.length);

    for(i = 0; i < dados.length; i++){
      dados.setValue(i, dados[i]);
    }

    var div = document.getElementById('chart_div');
    var grafico = new google.visualization.LineChart(div);
    grafico.draw(dados, {width: 700, height: 340, title: 'Minhas contas'})

  }


  function recuperaValores(){

    var resultados = [];

    $http.get('api/fazenda/{nome}/temperatura/')
        .then(function(result) {
          resultados = result.data;
        }, function(erro){
          console.log(erro);
        });

    return resultados;
  }

});
