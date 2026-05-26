'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var usuariosRoutes = require('./routers/usuarios');
var categoriaRoutes = require('./routers/categoria');
var recetaRoutes = require('./routers/recetas');
var valoracionRoutes = require('./routers/valoraciones');
var estadisticaRoutes = require('./routers/estadisticas');
//var verificarToken = require('./middleware/autenticacion');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//app.use(verificarToken);   //para proteger todas las rutas, se puede aplicar a rutas específicas en los routers correspondientes

//CORS
// rutas
app.use('/api', usuariosRoutes, categoriaRoutes, recetaRoutes, valoracionRoutes, estadisticaRoutes);
//exportar
module.exports = app;


