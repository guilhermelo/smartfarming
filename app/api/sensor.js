var mongoose = require('mongoose');

var api = {};

var model = mongoose.model('Sensor');

api.gravarSensor = function(sensor){
  model
      .create(sensor)
      .then(function(sensor){
         console.log("Sensor salvo!");
       }, function(error){
         console.log(error);
       });
};

api.atualiza = function(){
  model.findByIdAndUpdate(req.params.id, req.body)
       .then(function(sensor){
         res.json(sensor)
       }, function(error){
         console.log(error);
         res.status(500).json(error);
       });
};

api.recuperaSensor = function(req, res){
  //Trabalhando com promise
  model
      .find({})
      .then(function(sensores){
        res.json(sensores);
      }, function(error){
        console.log(error);
        res.status(500).json(error);
      });

  //model.find().distinct('fazenda');
};

api.recuperSensorPorId = function(){
  model.findById(req.params.id)
       .then(function(sensor){
         if(!sensor){
           throw Error('Foto não encontrada');
         }
         res.json(sensor);

       }, function(error){
         console.log(error);
         res.status(500).json(error);
       })
};

api.removerPorId = function(req, res){
  model.remove({_id: req.params.id})
       .then(function(){
         //Executa operação e não devolve nada - 204
         res.sendStatus(204);
       }, function(error){
         console.log(error);
         res.status(500).json(error);
       });
}

module.exports = api;
