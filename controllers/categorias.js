'use strict'
const { get } = require('mongoose');
var Categoria = require('../models/categorias');
var controller = {
    saveCategoria: function(req, res) {
        var categoria = new Categoria();
        const {nombre} = req.body;

        if (nombre) {
            categoria.nombre = nombre;

            categoria.save()
                .then(categoriaStored => {
                    categoriaStored
                        ? res.status(200).json({categoria: categoriaStored})
                        : res.status(404).send({message: 'No se ha podido guardar la categoria'});
                })
                .catch(err => res.status(500).send({message: 'Error al guardar la categoria'}));
        } else {
            return res.status(400).send({message: 'Faltan datos por enviar'});
        }
    },
    getCategoria: async function(req, res) {
        var categoriaId = req.params.id;
        if (categoriaId == null) return res.status(400).send({message: 'La categoria no existe'});

        Categoria.findById(categoriaId).exec()
            .then(categoria => {
                if (!categoria) return res.status(404).send({message: 'La categoria no existe'});
                return res.status(200).json({categoria});
            })
            .catch(err => res.status(500).send({message: `Internal error-> ${err}`}));
    },
    getCategorias: function(req, res) {
        Categoria.find().exec()
            .then(categoriasList => {
                if (!categoriasList) return res.status(404).send({message: 'No hay categorias para mostrar'});
                return res.status(200).json({categorias: categoriasList});
            })
            .catch(err => res.status(500).send({message: 'Error al devolver los datos'}));
    },
    updateCategoria: function(req, res) {
        var categoriaId = req.params.id;
        var update = req.body;
        Categoria.findByIdAndUpdate(categoriaId, update, {returnDocument: 'after'})
            .then(categoriaUpdated => {
                if (!categoriaUpdated) return res.status(404).send({message: 'No se ha podido actualizar la categoria'});
                return res.status(200).send({categoria: categoriaUpdated});
            })
            .catch(err => res.status(500).send({message: 'Error al actualizar la categoria'}));
    },
    deleteCategoria: function(req, res) {
        var categoriaId = req.params.id;
        Categoria.findByIdAndDelete(categoriaId)
            .then(categoriaDeleted => {
                if (!categoriaDeleted) return res.status(404).send({message: 'No se ha podido eliminar la categoria'});
                return res.status(200).send({categoria: categoriaDeleted});
            })
            .catch(err => res.status(500).send({message: 'Error al eliminar la categoria'}));       
    },
};

module.exports = controller;