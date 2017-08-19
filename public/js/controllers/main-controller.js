angular.module('smartfarming').controller('MainController', function($scope, $http){

  $scope.sensores = [];
  $scope.filtro = '';
  $scope.mostraMenu = true;

$http.get('/api/sensores')
     .then(function(resultado){
        $scope.sensores = resultado.data;
      },function(erro){
          console.log(erro);
      });
});
