angular.module('smartfarming', ['minhasDiretivas', 'ngAnimate', 'ngRoute'])
.config(function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);
  //Quando a url tiver /#/sensores
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
  })

  $routeProvider.otherwise({ redirectTo: '/sensores'});
});
