const express = require('express');
const router = express.Router();
const actorController = require('../../client/controller/actorController');

// Rutas para actores
router.get('/', actorController.getAll);
router.get('/pelicula/:peliculaId', actorController.getByPelicula);
router.get('/:id', actorController.getById);

module.exports = router;