module.exports = function(app){

  var api = app.api.temperatura;

  app.get('/sensor/temperatura', api.recuperaTemperatura);
};
