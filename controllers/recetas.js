'use strict'
const { get } = require('mongoose');
var Receta = require('../models/recetas');
var controller = {
    saveReceta: function(req, res) {
        var receta = new Receta();
        const {nombre, ingredientes, tiempoPreparacion, dificultad, categoria_id, autor_id} = req.body;

        if (nombre && ingredientes && tiempoPreparacion && dificultad && categoria_id && autor_id) {
            receta.nombre = nombre;
            receta.ingredientes = ingredientes;
            receta.tiempoPreparacion = tiempoPreparacion;
            receta.dificultad = dificultad;
            receta.categoria_id = categoria_id;
            receta.autor_id = autor_id;

            receta.save()
                .then(recetaStored => {
                    recetaStored
                        ? res.status(200).json({receta: recetaStored})
                        : res.status(404).send({message: 'No se ha podido guardar la receta'});
                })
                .catch(err => {
                    res.status(500).send({message: 'Error al guardar la receta'});
                });
        } else {
            res.status(400).send({message: 'Todos los campos son requeridos'});
        }
    },
    getReceta: async function(req, res) {
        var recetaId = req.params.id;
        if (recetaId == null) return res.status(400).send({message: 'La receta no existe'});   

        Receta.findById(recetaId).exec()
            .then(receta => {
                if (!receta) return res.status(404).send({message: 'La receta no existe'});
                return res.status(200).json({receta});
            })
            .catch(err => res.status(500).send({message: `Internal error-> ${err}`}));
    },
    getRecetaByIngredientes: async function(req, res) {
        var ingredientes = req.query.ingredientes;
        if (!ingredientes) return res.status(400).send({message: 'Se requieren ingredientes para la búsqueda'});

        const ingredientesLista = ingredientes.split(',');
        Receta.find({ ingredientes: { $in: ingredientesLista.map(i => new RegExp(i, 'i')) } }).exec()
            .then(recetas => {
                if (!recetas || recetas.length === 0) return res.status(404).send({message: 'No se encontraron recetas con esos ingredientes'});
                return res.status(200).json({recetas});
            })
            .catch(err => res.status(500).send({message: `Error al buscar recetas por ingredientes-> ${err}`}));
    },
    getRecetaByCategoria: async function(req, res) {
        var categoriaId = req.query.categoria_id;
        Receta.find({ categoria_id: categoriaId })
            .then(recetas => {
                if (!recetas || recetas.length === 0) return res.status(404).send({message: 'No se encontraron recetas para esta categoría'});
                return res.status(200).json({recetas});
            })
            .catch(err => res.status(500).send({message: `Error al buscar recetas por categoría-> ${err}`}));
    },
    getRecetas: async function(req, res) {
        Receta.find({}).exec()
            .then(recetasList => {
                if (!recetasList) return res.status(404).send({message: 'No hay recetas para mostrar'});
                return res.status(200).json({recetasList});
            })
            .catch(err => res.status(500).send({message: 'Error al devolver los datos'}));
    },
    updateReceta: function(req, res) {
        var recetaId = req.params.id;
        var update = req.body; 
        Receta.findByIdAndUpdate(recetaId, update, {returnDocument: 'after'})
            .then(recetaUpdated => {
                if (!recetaUpdated) return res.status(404).send({message: 'No se ha podido actualizar la receta'});
                return res.status(200).send({receta: recetaUpdated});
            })
            .catch(err => res.status(500).send({message: 'Error al actualizar la receta'}));    
    },
    deleteReceta: function(req, res) {
        var recetaId = req.params.id;
        Receta.findByIdAndDelete(recetaId)
            .then(recetaDeleted => {
                if (!recetaDeleted) return res.status(404).send({message: 'No se ha podido eliminar la receta'});
                return res.status(200).send({receta: recetaDeleted});
            })
            .catch(err => res.status(500).send({message: 'Error al eliminar la receta'}));
    }, 
};

module.exports = controller;