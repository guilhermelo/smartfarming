var mongoose = require('mongoose');

var schema = mongoose.Schema({
  codigo: {
    type: Number,
    required: true
  },
  fazenda: {
      type: String,
      required: true
  }
});

mongoose.model('CadSensor', schema);
