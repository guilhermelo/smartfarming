var path = require('path');

module.exports = function(app){

  var api = app.api.sensor;

  app.get('/api/sensores', api.recuperaSensor);

  app.all('/*', function(req, res) {
        res.sendFile(path.resolve('public/index.html'));
  });
};
