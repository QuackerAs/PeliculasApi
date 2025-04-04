const express = require('express');
const router = express.Router();
const PeliculasController = require('../controllers/peliculasController');

// Ruta para búsqueda de películas por título
router.get('/buscar', PeliculasController.buscarPorTitulo);

// Ruta para obtener películas populares
router.get('/populares', PeliculasController.obtenerPopulares);

// Ruta para obtener detalles de una película específica
router.get('/detalles/:id', PeliculasController.obtenerDetalles);

// Ruta para filtrar películas por género
router.get('/genero/:generoId', PeliculasController.filtrarPorGenero);

// Ruta para obtener todos los géneros disponibles
router.get('/generos', PeliculasController.obtenerGeneros);

module.exports = router;