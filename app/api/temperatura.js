var api = {};

var obj = {
  latitude: '10023',
  longitude: '242554',
  fazenda: 'Fazenda 1',
  talhao: 'Talhao 3',
  temperatura: '25 °C'
};

api.gravaTemperatura = function(req, res){
  res.json(obj);
}

api.recuperaTemperatura = function(req, res){
  res.json(obj);
}

module.exports = api;
