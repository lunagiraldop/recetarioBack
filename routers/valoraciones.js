'use strict'

var express = require('express');
var ValoracionController = require('../controllers/valoraciones');

var router = express.Router();

router.post('/save-valoracion', ValoracionController.saveValoracion);
router.get('/valoraciones', ValoracionController.getValoraciones);
router.get('/valoraciones-receta/:id', ValoracionController.getValoracionesByReceta);
router.get('/valoraciones-usuario/:id', ValoracionController.getValoracionesByUsuario);
router.put('/edit-valoracion/:id', ValoracionController.updateValoracion);
router.delete('/delete-valoracion/:id', ValoracionController.deleteValoracion);


module.exports = router; 