'use strict'

var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var UsuarioSchema = Schema({
    nombre: {type: String, required: true},
    correo: {type: String, required: true, unique: true},
    edad: {type: Number},
    contraseña: {type: String, required: true}
});

module.exports = mongoose.model('Usuario', UsuarioSchema);  