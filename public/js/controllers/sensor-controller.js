angular.module('smartfarming').controller('SensorController', function($scope, $http){

  $scope.sensor = {};

  $scope.submeter = function(){
    // Verifica se formulário está válido
    if($scope.formulario.$valid){
      $hhtp.post('/sensor/save', $scope.foto).success(function(){
        $scope.sensor = {};
        $scope.mensagem = 'Sensor cadastrado com sucesso';
      }).error(function(){
        $scope.mensagem = 'Erro ao tentar cadastrar sensor';
      });
    }
  }
});
