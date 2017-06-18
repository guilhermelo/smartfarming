var http = require('http');
var app = require('./conf/express');

http.createServer(app).listen(3000, function(){
  console.log("Servidor no ar! :)");
});
