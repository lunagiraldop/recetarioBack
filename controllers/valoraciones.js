'use strict'
var mongoose = require('mongoose');
var Receta = require('../models/recetas');
var Valoracion = require('../models/valoraciones');

var controller = {
    saveValoracion: function(req, res) {
        var valoracion = new Valoracion();
        const {receta_id, usuario_id, calificacion, comentario} = req.body;

        if (receta_id && usuario_id && calificacion) {
            valoracion.receta_id = receta_id;
            valoracion.usuario_id = usuario_id;
            valoracion.calificacion = calificacion;   
            valoracion.comentario = comentario || '';
        }
        valoracion.save()
            .then(valoracionStored => {
                valoracionStored
                    ? res.status(200).json({valoracion: valoracionStored})
                    : res.status(404).send({message: 'No se ha podido guardar la valoración'});
            })
            .catch(err => res.status(500).send({message: 'Error al guardar la valoración'})); 
    },
    getValoracionesByReceta: function(req, res) {
        var recetaId = req.params.id;

        Valoracion.find({ receta_id: recetaId })
            .populate('usuario_id', 'nombre email') 
            .then(valoraciones => {
                if (!valoraciones || valoraciones.length === 0) {
                    return res.status(404).send({ message: 'No se encontraron valoraciones para esta receta' });
                }
                res.status(200).json({ valoraciones: valoraciones });
            })
            .catch(err => {
                res.status(500).send({ message: 'Error al obtener las valoraciones' });
            });
    },
    getValoracionesByUsuario: function(req, res) {
        var usuarioId = req.params.id;

        Valoracion.find({ usuario_id: usuarioId })
            .populate('receta_id', 'nombre descripcion') // Populate recipe information
            .then(valoraciones => {
                if (!valoraciones || valoraciones.length === 0) {
                    return res.status(404).send({ message: 'No se encontraron valoraciones para este usuario' });
                }
                res.status(200).json({ valoraciones: valoraciones });
            })
            .catch(err => {
                res.status(500).send({ message: 'Error al obtener las valoraciones' });
            });
    },
    getValoraciones: function(req, res) {
        Valoracion.find({}).exec()
            .then(valoracionesList => {
                if (!valoracionesList) return res.status(404).send({message: 'No hay valoraciones para mostrar'});
                return res.status(200).json({valoracionesList});
            })
            .catch(err => res.status(500).send({message: 'Error al devolver los datos'}));
    },
    updateValoracion: function(req, res) {
        var valoracionId = req.params.id;
        var update = req.body;
        Valoracion.findByIdAndUpdate(valoracionId, update, {returnDocument: 'after'})
            .then(valoracionUpdated => {
                if (!valoracionUpdated) return res.status(404).send({message: 'No se ha podido actualizar la valoración'});
                return res.status(200).send({valoracion: valoracionUpdated});
            })
            .catch(err => res.status(500).send({message: 'Error al actualizar la valoración'}));
    },
    deleteValoracion: function(req, res) {
        var valoracionId = req.params.id; 
        Valoracion.findByIdAndDelete(valoracionId)
            .then(valoracionDeleted => {
                if (!valoracionDeleted) {
                    return res.status(404).send({message: 'No se ha podido eliminar la valoración'});
                }
                return res.status(200).send({message: 'Valoración eliminada correctamente'});
            })
            .catch(err => res.status(500).send({message: 'Error al eliminar la valoración'}));
    },
};

module.exports = controller;