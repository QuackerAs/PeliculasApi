const db = require('../config/db');

const Actor = {
  // Obtener todos los actores
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM actores');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Obtener actor por ID
  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM actores WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },
  
  // Obtener actores por película
  getByPelicula: async (peliculaId) => {
    try {
      const [rows] = await db.query(`
        SELECT a.* FROM actores a
        JOIN reparto r ON a.id = r.id_actor
        WHERE r.id_pelicula = ?
      `, [peliculaId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Actor;