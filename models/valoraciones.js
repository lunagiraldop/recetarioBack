'use strict'

var mongoose = require('mongoose');
var Schema  = mongoose.Schema;

var ValoracionSchema = Schema({
    receta_id: Schema.Types.ObjectId,
    usuario_id: String,     
    calificacion: Number,
    comentario: String
});

module.exports = mongoose.model('Valoraciones', ValoracionSchema);  