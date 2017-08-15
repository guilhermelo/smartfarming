angular.module('smartfarming').factory('tokenInterceptor', function($q, $window, $location) {

  var interceptor = {};

  interceptor.response = function(response) {
    //Recupera token
    var token = response.headers('x-access-token');
    if(token){
      //Armazenando na sessionStorage do navegador
      $window.sessionStorage.token = token;
      console.log('Token armazenado no navegador');
    }
    return response;
  };

  interceptor.request = function(config){
    //vai receber ele mesmo, caso não existir, ele recebe o objeto vazio
    config.headers = config.headers || {};

    if($window.sessionStorage.token){
      //Adicionando o token ao header da requisição
      config.headers['x-access-token'] = $window.sessionStorage.token;
    }
    return config;
  };

  interceptor.responseError = function(rejection){
    if(rejection != null && rejection.status == 401){
      //Redirecionar para a parcial de login
      delete $window.sessionStorage.token;
      $location.path('/login');
    }

    return $q.reject(rejection);
  };

  return interceptor;
});
