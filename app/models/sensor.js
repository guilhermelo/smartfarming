var mongoose = require('mongoose');
var schema = mongoose.Schema({
  codigo: {
    type: Number,
    required: true
  },
  fazenda: {
    type: String,
    required: true
  },
  temperatura: {
    type: String,
    required: true
  },
  umidade: {
    type: String,
    required: true
  },
  luminosidade: {
    type: String,
    required: true
  },
  /*
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  }, */
  dtHrRecuperado: {
    type: String,
    required: true
  }
});
mongoose.model('Sensor', schema);
