const express = require('express');
const router = express.Router();
// Cargamos el controlador de parking
const parkingController = require('../app/api/controllers/parking');

router.use('/', parkingController.getparking);

module.exports = router