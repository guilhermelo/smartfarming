var path = require('path');

module.exports = function(app){

  var api = app.api.sensor;

  app.get('/api/sensores', api.recuperaSensor);

  app.get('/api/fazenda/:id/temperatura', api.recuperaSensoresPorId);

  app.post('/api/sensor/save', api.gravarCadSensor);

  app.all('/*', function(req, res) {
        res.sendFile(path.resolve('public/index.html'));
  });
};
