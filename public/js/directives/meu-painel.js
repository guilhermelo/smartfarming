angular.module('minhasDiretivas', []).directive('meuPainel', function(){
  //directive definition object
  var ddo = {};

  ddo.restrict = "AE"; //pode ser usada como atributo ou elemento

  ddo.scope = {
    sensor: '=sensor'
  };

  //mecanismo de transclusão - manter elementos filhos
  ddo.transclude = true;


  ddo.templateUrl = 'js/directives/meu-painel.html';

  return ddo;
});
