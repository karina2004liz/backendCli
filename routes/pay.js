const express = require('express');
const router = express.Router();
// Cargamos el controlador del usuario
const payController = require('../app/api/controllers/pay');
// Especificamos nuestras rutas teniendo en cuenta los metodos creados en nuestro controlador, y especificando que seran rutas que usaran el metodo POST

router.post('/', payController.create)
router.post('/getByUser', payController.getAllByUser )
router.post('/getAllPays', payController.getAllPays)
router.post('/getByDates', payController.getAllByDates)
router.post('/getByParking',payController.getAllByParking)
router.post('/getByDateAndParking',payController.getAllByDatesAndParking)

module.exports = router
