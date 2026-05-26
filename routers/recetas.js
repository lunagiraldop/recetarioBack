'use strict'

var express = require('express');
var RecetaController = require('../controllers/recetas');

var router = express.Router();

router.post('/save-receta', RecetaController.saveReceta);
router.get('/receta/:id', RecetaController.getReceta);
router.get('/receta-ingredientes', RecetaController.getRecetaByIngredientes);
router.get('/receta-categoria', RecetaController.getRecetaByCategoria);
router.get('/recetas', RecetaController.getRecetas);
router.put('/edit-receta/:id', RecetaController.updateReceta);
router.delete('/delete-receta/:id', RecetaController.deleteReceta);


module.exports = router; 