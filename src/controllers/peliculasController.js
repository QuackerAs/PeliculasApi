const PeliculasModel = require('../models/peliculasModel');

const PeliculasController = {
  // Búsqueda de películas por título
  buscarPorTitulo: async (req, res) => {
    try {
      const { titulo } = req.query;
      if (!titulo) {
        return res.status(400).json({ error: 'Se requiere un título para la búsqueda' });
      }
      
      const peliculas = await PeliculasModel.buscarPorTitulo(titulo);
      res.json(peliculas);
    } catch (error) {
      console.error('Error en búsqueda:', error);
      res.status(500).json({ error: 'Error al buscar películas' });
    }
  },

  // Obtener películas populares
  obtenerPopulares: async (req, res) => {
    try {
      const peliculas = await PeliculasModel.obtenerPopulares();
      res.json(peliculas);
    } catch (error) {
      console.error('Error al obtener populares:', error);
      res.status(500).json({ error: 'Error al obtener películas populares' });
    }
  },

  // Obtener detalles de una película
  obtenerDetalles: async (req, res) => {
    try {
      const { id } = req.params;
      const pelicula = await PeliculasModel.obtenerDetalles(id);
      
      if (!pelicula) {
        return res.status(404).json({ error: 'Película no encontrada' });
      }
      
      res.json(pelicula);
    } catch (error) {
      console.error('Error al obtener detalles:', error);
      res.status(500).json({ error: 'Error al obtener detalles de la película' });
    }
  },

  // Filtrar películas por género
  filtrarPorGenero: async (req, res) => {
    try {
      const { generoId } = req.params;
      
      if (!generoId) {
        return res.status(400).json({ error: 'Se requiere un ID de género' });
      }
      
      const peliculas = await PeliculasModel.filtrarPorGenero(generoId);
      res.json(peliculas);
    } catch (error) {
      console.error('Error al filtrar por género:', error);
      res.status(500).json({ error: 'Error al filtrar películas por género' });
    }
  },

  // Obtener lista de géneros
  obtenerGeneros: async (req, res) => {
    try {
      const generos = await PeliculasModel.obtenerGeneros();
      res.json(generos);
    } catch (error) {
      console.error('Error al obtener géneros:', error);
      res.status(500).json({ error: 'Error al obtener lista de géneros' });
    }
  }
};

module.exports = PeliculasController;