const Pelicula = require('../../server/models/peliculaModel');
const Actor = require('../../server/models/actorModel');

const peliculaController = {
  // Obtener todas las películas
  getAll: async (req, res) => {
    try {
      const peliculas = await Pelicula.getAll();
      res.json(peliculas);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener películas', error: error.message });
    }
  },

  // Obtener película por ID con detalles
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const pelicula = await Pelicula.getDetalles(id);
      
      if (!pelicula) {
        return res.status(404).json({ message: 'Película no encontrada' });
      }

      // Obtener el reparto
      const actores = await Actor.getByPelicula(id);
      pelicula.reparto = actores;

      res.json(pelicula);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la película', error: error.message });
    }
  },

  // Buscar películas por título
  searchByTitle: async (req, res) => {
    try {
      const titulo = req.query.titulo;
      if (!titulo) {
        return res.status(400).json({ message: 'El título es requerido' });
      }
      
      const peliculas = await Pelicula.searchByTitle(titulo);
      res.json(peliculas);
    } catch (error) {
      res.status(500).json({ message: 'Error al buscar películas', error: error.message });
    }
  },

  // Filtrar películas por género
  getByGenero: async (req, res) => {
    try {
      const generoId = req.params.generoId;
      const peliculas = await Pelicula.getByGenero(generoId);
      res.json(peliculas);
    } catch (error) {
      res.status(500).json({ message: 'Error al filtrar por género', error: error.message });
    }
  }
};

module.exports = peliculaController;