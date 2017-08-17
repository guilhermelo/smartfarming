angular.module('smartfarming').controller('SensorController', function($scope, $http){

  $scope.sensor = {};

  $scope.submeter = function(){
    // Verifica se formulário está válido
    if($scope.formulario.$valid){
      $http.post('/sensor/save')
           .then(function(result){
              console.log('Sensor adicionado');
           }, function(error){
              console.log('Erro: ' + error);
           });
    }
  }
});
