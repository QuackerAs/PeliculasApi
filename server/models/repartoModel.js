const db = require('../config/db');

const Reparto = {
  // Obtener el reparto completo
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT r.id_pelicula, r.id_actor, p.titulo, a.actor
        FROM reparto r
        JOIN peliculas p ON r.id_pelicula = p.id
        JOIN actores a ON r.id_actor = a.id
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Obtener el reparto de una película
  getByPelicula: async (peliculaId) => {
    try {
      const [rows] = await db.query(`
        SELECT r.id_pelicula, r.id_actor, a.actor
        FROM reparto r
        JOIN actores a ON r.id_actor = a.id
        WHERE r.id_pelicula = ?
      `, [peliculaId]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Reparto;