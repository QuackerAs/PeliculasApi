const Genero = require('../../server/models/generoModel');

const generoController = {
  // Obtener todos los géneros
  getAll: async (req, res) => {
    try {
      const generos = await Genero.getAll();
      res.json(generos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener géneros', error: error.message });
    }
  },

  // Obtener género por ID
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const genero = await Genero.getById(id);
      
      if (!genero) {
        return res.status(404).json({ message: 'Género no encontrado' });
      }

      res.json(genero);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el género', error: error.message });
    }
  }
};

module.exports = generoController;