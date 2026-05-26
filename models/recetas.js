'use strict'

var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var RecetaSchema = Schema({
    nombre: String,
    ingredientes: String,
    tiempoPreparacion: Number,
    dificultad: { type: String, enum: ['Fácil', 'Media', 'Difícil'] },
    categoria_id: String,     
    autor_id: String,
});

module.exports = mongoose.model('Receta', RecetaSchema);  