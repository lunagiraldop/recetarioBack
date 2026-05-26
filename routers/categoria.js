'use strict'

var express = require('express');
var CategoriaController = require('../controllers/categorias');

var router = express.Router();

router.post('/save-categoria', CategoriaController.saveCategoria);
router.get('/categoria/:id', CategoriaController.getCategoria);
router.get('/categorias', CategoriaController.getCategorias);
router.put('/edit-categoria/:id', CategoriaController.updateCategoria);
router.delete('/delete-categoria/:id', CategoriaController.deleteCategoria);


module.exports = router; 
