module.exports = function(app){
  var api = app.api.auth;

  app.post('/api/autenticar', api.autentica);

  //Trata qualquer verbo HTTP
  app.use('/api/*', api.verificaToken);
};
