angular.module('smartfarming', ['minhasDiretivas', 'ngAnimate', 'ngRoute'])
.config(function($routeProvider, $locationProvider, $httpProvider) {

  $locationProvider.html5Mode(true);

  //Trabalha com  baixo nível do http com mesmo nome do factory
  $httpProvider.interceptors.push('tokenInterceptor');

  $routeProvider.when('/sensores', {
    templateUrl: 'partials/principal.html',
    controller: 'MainController'
  });

  $routeProvider.when('/sensor/new', {
    templateUrl: 'partials/sensor.html',
    controller: 'SensorController'
  });

  $routeProvider.when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginController'
  });

  $routeProvider.when('/sensor/chart/:id', {
    templateUrl: 'partials/grafico.html',
    controller: 'GoogleChartController'
  });

  $routeProvider.otherwise({ redirectTo: '/sensores'});

});
