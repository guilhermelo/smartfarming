angular.module('smartfarming').controller('LoginController', function($scope, $http, $location) {

  $scope.usuario = {};
  $scope.mensagem = '';
  $scope.mostraMenu = false;

  $scope.autenticar = function(){
    var usuario = $scope.usuario;

    $http.post('/api/autenticar', {
      login: usuario.login,
      senha: usuario.senha
    }).then(function(){
      $location.path('/');
    }, function(error){
      console.log(error);
      $scope.mensagem = 'Login ou senha inválidos';
    });
  };
});
