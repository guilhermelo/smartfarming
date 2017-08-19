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

    cllientMQTT.subscribe('/sensores', function(){
      cllientMQTT.on('message', function(topic, message){
        console.log("Mensagem: " + message.toString());
        if(message.toString().startsWith("{")){
            var json = JSON.parse(message.toString());
            json.dtHrRecuperado = moment().format('DD/MM/YYYY HH:mm:ss');
            //Salvar o sensor no banco de dados
            if(api.verificaCadSensor(json.codigo)){
                api.gravarSensor(json);
            }else{
              console.log('Sensor não cadastrado');
            }
        }else{
          console.log("Payload não é um JSON!");
        }
        cllientMQTT.end();
      });
    });

    cllientMQTT.on('error', function(error) {
      console.log(error);
    });
  });
}

module.exports = schedule;
