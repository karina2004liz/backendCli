//Cargamos módulo de dotenv para utilizar variables de entorno y proteger nuestra info
require('dotenv').config();
const password = process.env.PASS
const user = process.env.USER

//url de la base de datos
const uri = `mongodb+srv://${user}:${password}@cluster0.vzgep.mongodb.net/dbclivo?retryWrites=true&w=majority`;
//Cargando el modulo de mongoose
const mongoose = require('mongoose');
mongoose.connect(uri,{ useUnifiedTopology: true , useNewUrlParser: true });
mongoose.Promise = global.Promise;
//Exportamos para usar en server
module.exports = mongoose;


