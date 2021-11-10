'use strict'
 
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
 
// Cargamos el controlador
var libroController = require('../controllers/libroController');


// Llamamos al router
var api = express.Router();
 
//  Guardar, listar, modificar, eliminar libros
api.post('/libros', libroController.guardar);
api.get('/libros', libroController.listarTodo);
api.get('/libros/:id', libroController.listar);
api.put('/libros/:id', libroController.modificar);
api.delete('/libros/:id', libroController.eliminar);



// Exportamos la configuración
module.exports = api;