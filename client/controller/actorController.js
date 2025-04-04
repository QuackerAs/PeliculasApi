const Actor = require('../../server/models/actorModel');

const actorController = {
  // Obtener todos los actores
  getAll: async (req, res) => {
    try {
      const actores = await Actor.getAll();
      res.json(actores);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener actores', error: error.message });
    }
  },

  // Obtener actor por ID
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const actor = await Actor.getById(id);
      
      if (!actor) {
        return res.status(404).json({ message: 'Actor no encontrado' });
      }

      res.json(actor);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el actor', error: error.message });
    }
  },
  
  // Obtener actores por película
  getByPelicula: async (req, res) => {
    try {
      const peliculaId = req.params.peliculaId;
      const actores = await Actor.getByPelicula(peliculaId);
      res.json(actores);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener actores de la película', error: error.message });
    }
  }
};

module.exports = actorController;