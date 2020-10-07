// Cargamos el modelo recien creado
const userModel = require('../models/users');
// Cargamos el módulo de bcrypt
const bcrypt = require('bcryptjs'); 
// Cargamos el módulo de jsonwebtoken
const jwt = require('jsonwebtoken');

// Codificamos las operaciones que se podran realizar con relacion a los usuarios
module.exports = {

    // método para crear usuarios
 create: function(req, res, next) {
  userModel.create({ name: req.body.name, phone: req.body.phone, email: req.body.email, password: req.body.password }, function (err, result) {
      if (err) 
       next(err);
      else
       res.json({status: "Ok", message: "Usuario agregado exitosamente!!!", data: null});
      
    });
 },
 // método para logear al usuaario
 /*
authenticate: function(req, res, next) {
   console.log(req.body.email)
   console.log(req.body.password)
  userModel.findOne({email:req.body.email}, function(err, userInfo){
     if (err) {
      res.json({status:"error", message: err});
      next(err);
     } else {
      if(bcrypt.compareSync(req.body.password, userInfo.password)) {
        const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
        res.json({status:"Ok", message: "El usuario ha sido autenticado!!!", data:{user: userInfo, token:token}});
      }else{
        res.json({status:"error", message: "Invalid email/password!!", data:null});
      }
     }
    });
 },

 */
    //método para actualizar datos de usuario
 updateById: function(req, res, next) {
    userModel.findByIdAndUpdate({_id: req.body.id },{name:req.body.name , phone:req.body.phone}, function(err, userInfo){
  if(err)
      next(err);
     else {
      res.json({status:"success", message: "User updated successfully!!!", data:null});
     }
    });
   },

   //método para obtener a todos los usuarioa
   getAllUsers: function(req, res, next) {
      let pays = [];
    userModel.find({}, function(err, paysUser){
       if (err){
        next(err);
       } else{
        for (let pay of paysUser) {
         pays.push({id: pay._id,  name: pay.name, email: pay.email, phone: pay.phone, created_at : pay.created_at.toISOString().substring(0,10)});
        }
        res.json({status:"success", message: "User list found!!!", data:{Users: pays}});
           
       }
    });
     },


     //Autenticación sólo con admin //

     authenticate: function(req, res, next) {
      console.log(req.body.email)
      console.log(req.body.password)
     userModel.findOne({$and:[{_id:"5f7d0bdb7438b267c8346b5c"},{email:req.body.email}]}, function(err, userInfo){
        if (err) {
         res.json({status:"error", message: "Usuario no autenticado"});
         next(err);
        } else {
         if(bcrypt.compareSync(req.body.password, userInfo.password)) {
           const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' });
           res.json({status:"Ok", message: "El usuario ha sido autenticado!!!", data:{user: userInfo, token:token}});
         }else{
           res.json({status:"error", message: "Invalid email/password!!", data:null});
         }
        }
       });
    },
}