const db = require('../config/db');

const Genero = {
  // Obtener todos los géneros
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM generos');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Obtener género por ID
  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM generos WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Genero;