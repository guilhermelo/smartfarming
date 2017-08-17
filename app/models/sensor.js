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
    required: false
  },
  umidade: {
    type: String,
    required: false
  },
  luminosidade: {
    type: String,
    required: false
  },
  dtHrRecuperado: {
    type: String,
    required: false
  }
});
mongoose.model('Sensor', schema);
