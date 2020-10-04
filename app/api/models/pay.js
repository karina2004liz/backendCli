// Cargamos el módulo de mongoose
const mongoose = require('mongoose');
//Definimos los esquemas
const Schema = mongoose.Schema;
// Creamos el objeto del esquema con sus correspondientes campos
const PaySchema = new Schema({
amount: {
  type: Number, 
  required: true,
  trim:true
 },
 ticket:{    
     type: String,
     trim:true,
     required:true,
 },
 idParking: {
  type: String,
  trim:true,
  required: true
 },
 idUser:{
     type:String,
     trim:true,
     require:true
 }
}, { timestamps: { createdAt: 'created_at' }});

// Exportamos el modelo para usarlo en otros ficheros
module.exports = mongoose.model('Pay', PaySchema);