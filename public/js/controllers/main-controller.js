angular.module('smartfarming').controller('MainController', function($scope, $http){

  $scope.sensores = [];
  $scope.filtro = '';

  $scope.sensores = [
    {
      fazenda: 'Fazenda São João',
      temperatura: '19 °C',
      umidade: '68%',
      chuva: '10%',
      luminosidade: '500'
    },
    {
      fazenda: 'Fazenda Petrolina',
      temperatura: '30 °C',
      umidade: '40%',
      chuva: '29%',
      luminosidade: '100'
    },
    {
      fazenda: 'Fazenda São José',
      temperatura: '21 °C',
      umidade: '60%',
      chuva: '5%',
      luminosidade: '300'
    },
  ];

  /*

  $http.get('v1/sensores').success(function(sensores){
    $scope.sensores = sensores;
  }).error(function(erro){
    console.log(erro);
  }); */

  // var promise = $http.get('v1/sensores');
  // promise.then(function(retorno){
  //   $scope.sensores = retorno.data;
  // }).catch(function(error){
  //   console.log(error);
  // });


});
