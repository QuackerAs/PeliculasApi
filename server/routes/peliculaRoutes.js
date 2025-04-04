const express = require('express');
const router = express.Router();
const peliculaController = require('../../client/controller/peliculaController');

// Rutas para películas
router.get('/', peliculaController.getAll);
router.get('/search', peliculaController.searchByTitle);
router.get('/genero/:generoId', peliculaController.getByGenero);
router.get('/:id', peliculaController.getById);

module.exports = router;