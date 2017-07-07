var path = require('path');

module.exports = function(app){

  var api = app.api.temperatura;

  app.get('/sensor/temperatura', api.recuperaTemperatura);


  app.all('/*', function(req, res) {
        res.sendFile(path.resolve('public/index.html'));
  });
};
