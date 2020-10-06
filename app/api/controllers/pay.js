// Cargamos el modelo recien creado
const payModel = require('../models/pay');
// Cargamos el módulo para conversión de Json a Csv
const {Parser} = require('json2csv') 

// Codificamos las operaciones que se podran realizar con relacion a los usuarios
module.exports = {
    // método para crear pagos
 create: function(req, res, next) {  
  payModel.create({ amount: req.body.amount, ticket: req.body.ticket, idParking: req.body.idParking, idUser: req.body.idUser }, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "Ok", message: "Pago realizado exitosamente!!!", data: null});
      
    });
 },
 // método para obtener transacciones de pagos por ID de usuario
 getAllByUser: function(req, res, next) {
    console.log(req.body.idUser)
    let pays = [];
  payModel.find({idUser:req.body.idUser}, function(err, paysUser){
     if (err){
      next(err);
     } else{
      for (let pay of paysUser) {
       pays.push({id: pay._id,  amount: pay.amount, ticket: pay.ticket, idParking: pay.idParking, idUser: pay.idUser, created_at : pay.created_at.toISOString().substring(0,10)});
      }
      res.json({status:"success", message: "paysUser list found!!!", data:{paysUser: pays}});
         
     }
  });
   },
  // método para obtener transacciones de pagos por fechas
   getAllByDates: function(req, res, next) {
    let startdate = req.body.firstDate
    let seconddate = req.body.secondDate
    let finaldate = seconddate.substring(0,8).concat(Number(seconddate.substring(8)) + 1);
 
    let pays = [];
  payModel.find({$and: [{created_at: {$gte: new Date(startdate)}},{created_at: {$lt: new Date(finaldate)}}]}, function(err, paysUser){
     if (err){
      next(err);
     } else{
      for (let pay of paysUser) {
       pays.push({id: pay._id,  amount: pay.amount, ticket: pay.ticket, idParking: pay.idParking, idUser: pay.idUser, created_at : pay.created_at.toISOString().substring(0,10)});
      }
     // let datafilter = pays.filter(el=>el.created_at === date)
      res.json({status:"success", message: "paysUser list found!!!", data:{paysUser: pays}});
         
     }
  });
   },
   // método para obtener transacciuones de pagos por estacionamiento
  getAllByParking: function(req, res, next) {

    let pays = [];
  payModel.find({idParking : req.body.idParking }, function(err, paysUser){
     if (err){
      next(err);
     } else{
      for (let pay of paysUser) {
       pays.push({id: pay._id,  amount: pay.amount, ticket: pay.ticket, idParking: pay.idParking, idUser: pay.idUser, created_at : pay.created_at.toISOString().substring(0,10)});
      }
      res.json({status:"success", message: "paysUser list found!!!", data:{paysUser: pays}});
         
     }
  });
   },
   //método para obtener transacciones por fecha y estacionamiento
   getAllByDatesAndParking:function(req, res, next) {

    let startdate = req.body.firstDate
    let seconddate = req.body.secondDate
    let finaldate = seconddate.substring(0,8).concat(Number(seconddate.substring(8)) + 1);
    let pays = [];
  payModel.find({$and: [{idParking: req.body.idParking},{created_at: {$gte: new Date(startdate)}},{created_at: {$lt: new Date(finaldate)}}]}, function(err, paysUser){
     if (err){
      next(err);
     } else{
      for (let pay of paysUser) {
       pays.push({id: pay._id,  amount: pay.amount, ticket: pay.ticket, idParking: pay.idParking, idUser: pay.idUser, created_at : pay.created_at});
      }
     let json2csvParser = new Parser()
     let csv = json2csvParser.parse(pays);
     console.log(csv)
      
     res.json({status:"success", message: "paysUser list found!!!", data:{paysUser: pays}});
         
     }
  });
   },
   getAllPays: function(req, res, next) {
      let pays = [];
    payModel.find({}, function(err, paysUser){
       if (err){
        next(err);
       } else{
        for (let pay of paysUser) {
         pays.push({id: pay._id,  amount: pay.amount, ticket: pay.ticket, idParking: pay.idParking, idUser: pay.idUser, created_at : pay.created_at.toISOString().substring(0,10)});
        }
        res.json({status:"success", message: "User list found!!!", data:{Transactions: pays}});
           
       }
    });
     }

}