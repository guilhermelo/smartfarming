#include <WiFiEsp.h>
#include <WiFiEspClient.h>
#include <WiFiEspUdp.h>
#include "SoftwareSerial.h"
#include <PubSubClient.h>
#include "dht.h"

//#define ESP_SSID                                      "House Rodrigues"
//#define ESP_PASS                                      "$tecrodrigues0422#"

#define ESP_SSID                                      "Guilherme"
#define ESP_PASS                                      "grm64595"

#define mqtt_server                                   "m11.cloudmqtt.com"
#define mqtt_port                                     10462
#define mqtt_client_id                                "ClientId"
#define mqtt_client_user                              "guilherme"
#define mqtt_client_pw                                "teste"
#define desconectado                                  "desconectado"

long lastMsg = 0;
long lastLoop = 0;

//Sensor de luz
int ldrPin = 0; //LDR no pino analígico 0
int ldrValor = 0;

int status = WL_IDLE_STATUS;

WiFiEspClient espClient;

void callback(char* topic, byte* payload, unsigned int length) {}

PubSubClient client(mqtt_server, mqtt_port, callback, espClient);

SoftwareSerial soft(2, 3); // RX, TX

dht DHT; //cria objeto do tipo DHT

void setup() {
  Serial.begin(9600);
  soft.begin(9600);
  
  WiFi.init(&soft);
 
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("Shield não encontrado!");
    while (true);
  }

  // attempt to connect to WiFi network
  while ( status != WL_CONNECTED) {
    Serial.print("Conectando a rede...");
    Serial.println(ESP_SSID);
    status = WiFi.begin(ESP_SSID, ESP_PASS);
  }

  Serial.println("Conectado a rede"); 
}

void sendData() {
  
  String temperatura = getTemperatura();
  String umidade = getUmidade();
  String luminosidade = getLuminosidade();
    
  String json = "{";
      json += "\"temperatura\":"; json += "\""; json += temperatura; json += "\""; json += ",";
      json += "\"fazenda\":"; json += "\"Fazenda Sâo José\""; json += ","; 
      json += "\"umidade\":"; json += "\""; json += umidade; json += "\""; json += ","; 
      json += "\"luminosidade\":"; json += "\""; json += luminosidade; json += "\""; json += ","; 
      json += "\"codigo\":"; json += "\"10\"";
      json += "}";
  
  Serial.print("Tamanho do json: ");  
  Serial.println(json.length());  
  
  char payload[200]; 
  json.toCharArray(payload, 200);

  if(client.publish("/sensores", payload)){
    Serial.print("Dados enviados ao broker:");  
    Serial.println(json);
  }else{
    Serial.print("Erro ao tentar enviar dados: ");  
    Serial.println(client.state());
  }
}

void loop() {

  long now = millis(); 

  if (now - lastMsg > 15000) {
    lastMsg = now;
    sendData();
  } 
 
  if (now - lastLoop > 200) {
    lastLoop = now;
    if (!client.connected()) {
      reconnect();
    }
    client.loop();
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Conectando ao MQTT...");
    if (client.connect(mqtt_client_id, mqtt_client_user, mqtt_client_pw)){
      Serial.println("Conectado ao MQTT");
 
    } else {
      Serial.print("Falha: ");
      Serial.print(client.state());
      Serial.println(" Tentando de novo em 5 segundos...");
      delay(5000);
    }
  }
}


String getUmidade(){
    //Chama metodo de leitura da classe dht com o pino de transmissao de dados ligado no pino a1
    DHT.read11(A1); 

    return String(DHT.humidity);
}

String getTemperatura(){
    DHT.read11(A1); 
    return String(DHT.temperature);
}


String getLuminosidade(){
  //ler o valor do LDR
  ldrValor = analogRead(ldrPin); //O valor lido será entre 0 e 1023
  
  return String(ldrValor);
}
