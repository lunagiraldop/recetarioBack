'use strict'
const mongoose = require('mongoose');
var Receta = require('../models/recetas');
var Valoracion = require('../models/valoraciones');
const { decodeBase64 } = require('bcryptjs');

var controller = {
    getValoracionPromedio: async function(req, res) {
        var recetaId = req.params.id;
        
        if (!recetaId) return res.status(400).send({message: 'Debe enviar el ID de la receta'});
        var receta = await Receta.findById(recetaId);
        if (!receta) return res.status(404).send({message: 'La receta no existe'});

        Valoracion.aggregate([
            { $match: { receta_id: recetaId } },
            { $group: { _id: '$receta_id', promedio: { $avg: '$calificacion' }, totalValoraciones: { $sum: 1 } } }
        ]).exec()
            .then(resultado => {
                if (!resultado || resultado.length === 0) return res.status(404).send({message: 'No se han encontrado valoraciones para esta receta'});
                return res.status(200).json({receta_id: recetaId, valoracion_promedio: resultado[0].promedio, total_valoraciones: resultado[0].totalValoraciones});
            })
            .catch(err => res.status(500).send({message: `Error al calcular la valoración promedio-> ${err}`}));
    },
    getRecetasMasValoradas: async function(req, res) {
        Valoracion.aggregate([
            { $group: { _id: '$receta_id', promedio: { $avg: '$calificacion' } } },
            { $sort: { promedio: -1 } },
            { $limit: 5 }
        ]).exec()
            .then(resultado => {
                if (!resultado || resultado.length === 0) return res.status(404).send({message: 'No se han encontrado valoraciones para las recetas'});
                return res.status(200).json({recetas: resultado});
            })
            .catch(err => res.status(500).send({message: `Error al calcular las recetas más valoradas-> ${err}`}));
    }
}

module.exports = controller;