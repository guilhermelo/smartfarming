angular.module('smartfarming').controller('MainController', function($scope, $http){

  $scope.sensores = [];
  $scope.filtro = '';

$http.get('/api/sensores')
     .then(function(resultado){
        $scope.sensores = resultado.data;
      },function(erro){
          console.log(erro);
      });
});
