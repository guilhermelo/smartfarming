module.exports = function(app){

  var mongoose = require('mongoose');
  var jwt = require('jsonwebtoken');
  var model = mongoose.model('Usuario');
  var api = {};

  api.autentica = function(req, res) {

    model
      .findOne({login: req.body.login, senha: req.body.senha})
      .then(function(usuario){
        if(!usuario){
          console.log('Login e senha inválidos');
          // Não autorizado
          res.sendStatus(401);
        }else{
          //Criar o token e assina o token
          var token = jwt.sign({login: usuario.login}, app.get('secret'), {
            //tempo de duração do token de 24hrs
            expiresIn: 84600
          });

          console.log('token criado e sendo enviado no header do response');
          res.set('x-access-token', token);
          res.end();
        }
      }, function(error){
        console.log('Login e senha inválidos');
        res.sendStatus(401);
      });
  };


  api.verificaToken = function(req, res, next){

    //Recuperando o token
    var token = req.headers['x-access-token'];
    if(token){
      console.log('Verificando Token...');
      jwt.verify(token, app.get('secret'), function(err, decoded) {
        if(err){
          console.log('Token rejeitado');
          res.sendStatus(401);
        }
        req.usuario = decoded;
        //Habilita para que o próximo middleware possa ser executado
        next();
      });
    }else{
      console.log('Token não foi enviado');
      res.sendStatus(401);
    }

  };

  return api;
};
