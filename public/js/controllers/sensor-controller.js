angular.module('smartfarming').controller('SensorController', function($scope, $http){

  $scope.sensor = {};
  $scope.mensagem = "";
  $scope.mostraMenu = true;

  $scope.submeter = function(){
    // Verifica se formulário está válido
    if($scope.formulario.$valid){
      $http.post('/api/sensor/save', $scope.sensor)
           .then(function(result){
              $scope.mensagem = 'Sensor adicionado!';
              $scope.sensor = {};
           }, function(error){
              $scope.mensagem = 'Sensor já cadastrado!';
           });
    }
  }
});
