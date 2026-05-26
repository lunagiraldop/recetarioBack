'use strict'
const { get } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var Usuario = require('../models/usuarios');
var controller = {
    saveUsuario: function(req, res) {
        const {nombre, correo, edad, contraseña} = req.body;

        if (nombre && correo && edad && contraseña) {
            Usuario.findOne({correo: correo})
                .then(existingUser => {
                    if (existingUser) {
                        return res.status(400).send({message: 'El correo ya está registrado'});
                    }

                    var usuario = new Usuario();
                    const contraseñaHash = bcrypt.hashSync(contraseña, 10);
                    usuario.nombre = nombre;
                    usuario.correo = correo;
                    usuario.edad = edad; 
                    usuario.contraseña = contraseñaHash; 

                    return usuario.save();
                })
                .then(usuarioStored => {
                    if (!usuarioStored) return;
                    return res.status(200).send({usuario: usuarioStored});
                })
                .catch(err => res.status(500).send({message: 'Error al guardar el usuario'}));
        } else {
            return res.status(400).send({message: 'Faltan datos por enviar'});
        }
    },
    loginUsuario: function(req, res) {
        const {correo, contraseña} = req.body;

        Usuario.findOne({correo}).exec()
            .then(usuario => {
                if (!usuario) return res.status(404).send({message: 'Datos incorrectos'});
                bcrypt.compare(contraseña, usuario.contraseña)
                    .then(isMatch => {
                        if (!isMatch) return res.status(401).send({message: 'Datos incorrectos'});
                        const token = jwt.sign({id: usuario._id}, 'secret');
                        return res.status(200).json({token});
                    });
            });
    },
    getUsuario: async function(req, res) {
        var usuarioId = req.params.id;
        if (usuarioId == null) return res.status(400).send({message: 'El usuario no existe'});
        
        Usuario.findById(usuarioId).exec()
            .then(usuario => {
                if (!usuario) return res.status(404).send({message: 'El usuario no existe'});
                return res.status(200).json({usuario});
            })
            .catch(err => res.status(500).send({message: `Internal error-> ${err}`}));
    },
    getUsuarios: async function(req, res) {
        Usuario.find({}).exec()
            .then(usuariosList => {
                if (!usuariosList) return res.status(404).send({message: 'No hay usuarios para mostrar'});
                return res.status(200).json({usuariosList});
            })
            .catch(err => res.status(500).send({message: 'Error al devolver los datos'}));
    },
    updateUsuario: function(req, res) {
        var usuarioId = req.params.id;
        var update = req.body;
        Usuario.findByIdAndUpdate(usuarioId, update, {returnDocument: 'after'})
            .then(usuarioUpdated => {
                if (!usuarioUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});
                return res.status(200).send({usuario: usuarioUpdated});
            })
            .catch(err => res.status(500).send({message: 'Error al actualizar el usuario'}));
    },
    deleteUsuario: function(req, res) {
        var usuarioId = req.params.id; 
        Usuario.findByIdAndDelete(usuarioId)
            .then(usuarioDeleted => {
                if (!usuarioDeleted) {
                    return res.status(404).send({message: 'No se ha podido eliminar el usuario'});
                }

                return res.status(200).send({
                    usuario: usuarioDeleted
                });
            })       
            .catch(err => {
                return res.status(500).send({
                    message: 'Error al eliminar el usuario'
                });
            });
    },
};

module.exports = controller;

