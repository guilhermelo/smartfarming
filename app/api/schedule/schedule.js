var cron  = require('node-cron');
var moment = require('moment');
var mqtt = require('mqtt');

function schedule(app){
  cron.schedule('*/1 * * * *', function(){
    var api = app.api.sensor;
    var cllientMQTT = mqtt.connect('mqtt://guilherme:teste@m11.cloudmqtt.com:10462');


    cllientMQTT.on('connect', function() {
      console.log('Conectado ao MQTT');
    });

    cllientMQTT.subscribe('/sensor', function(){
      cllientMQTT.on('message', function(topic, message){
        var json = JSON.parse(message.toString());
        json.dtHrRecuperado = moment().format('DD/MM/YYYY');
        //Salvar o sensor no banco de dados
        api.gravarSensor(json);
        cllientMQTT.end();
      });
    });

    cllientMQTT.on('error', function(error) {
      console.log(error);
    });
  });
}

module.exports = schedule;
