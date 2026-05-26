'use strict'

var express = require('express');
var UsuarioController = require('../controllers/usuarios');
var verificarToken = require('../middleware/autenticacion');


var router = express.Router();


router.post('/save-usuario', UsuarioController.saveUsuario);
router.post('/login', UsuarioController.loginUsuario);
router.get('/usuario/:id', verificarToken, UsuarioController.getUsuario);
router.get('/usuarios', UsuarioController.getUsuarios);
router.put('/edit-usuario/:id', UsuarioController.updateUsuario);
router.delete('/delete-usuario/:id', UsuarioController.deleteUsuario);


module.exports = router; 

