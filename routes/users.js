// Cargamos el modulo express
const express = require('express');
const router = express.Router();
// Cargamos el controlador del usuario
const userController = require('../app/api/controllers/users');
// Especificamos nuestras rutas teniendo en cuenta los metodos creados en nuestro controlador, y especificando que seran rutas que usaran el metodo POST

module.exports =  {

    reg: router.post('/register', userController.create),
    aut: router.post('/authenticate', userController.authenticate),
    upd:router.post('/update-user', userController.updateById),
    all: router.post('/all',userController.getAllUsers)


}

// module.exports = router;