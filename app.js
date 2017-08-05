//var http = require('http');
var app = require('./conf/express');
require('./conf/database')('localhost/smartfarming');

// http.createServer(app).listen(3000, function(){
//   console.log("Servidor no ar! :)");
// });
app.listen(3000, function(){
  console.log("Servidor no ar! :)");
});
