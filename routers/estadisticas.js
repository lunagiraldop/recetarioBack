'use strict'

var express = require('express');
var EstadisticaController = require('../controllers/estadisticas');

var router = express.Router();

router.get('/valoraciones-promedio/:id', EstadisticaController.getValoracionPromedio);
router.get('/topRecetas', EstadisticaController.getRecetasMasValoradas);

module.exports = router; 