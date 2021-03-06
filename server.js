const express = require('express');
const logger = require('morgan');
const users = require('./routes/users');
const parking = require('./routes/parking')
const pay = require('./routes/pay')
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //Importando la configuracion de conexion a la BD
var jwt = require('jsonwebtoken');
var cors = require('cors')
const app = express();
app.use(cors())
app.set('secretKey', 'ClaveSecreta'); // Clave Secreta para nuestro JWT

// Conectando a la base de datos de Mongo
mongoose.connection.on('error', console.error.bind(console, 'Error de conexion en MongoDB'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.get('/', function(req, res){
res.send("Clivo API REST con NodeJS y MongoDB debe aparecer algo");
});
// Rutas publicas usuario
app.use('/users', users.reg);
app.use('/users', users.aut);
app.use('/users',users.all);
// Rutas privadas usuario
app.use('/userUp', validateUser, users.upd);
// Rutas privadas que solo pueden ser consumidas con un token generado
app.use('/pay',validateUser , pay )
app.use('/getparking', validateUser,  parking)

//middleware para validar al usuario.
function validateUser(req, res, next) {

  jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
    if (err) {
      res.json({status:"error", message: err.message, data:null});
    }else{
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
  
}
// Manejando errores HTTP 404 para solicitudes de contenido inexistente
app.use(function(req, res, next) {
 let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// Manejo de errores, respuestas con codigo HTTP 500, HTTP 404
app.use(function(err, req, res, next) {
 console.log(err);
 
  if(err.status === 404)
   res.status(404).json({message: "Not found"});
  else 
    res.status(500).json({message: "Error interno en el servidor!!"});
});
app.listen(3000, function(){
 console.log('El servidor ha sido inicializado: http://localhost:3000');
});