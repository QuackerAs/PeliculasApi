const db = require('../config/db');

const Pelicula = {
  // Obtener todas las películas
  getAll: async () => {
    try {
      const [rows] = await db.query('SELECT * FROM peliculas');
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Obtener película por ID
  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM peliculas WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Buscar películas por título
  searchByTitle: async (titulo) => {
    try {
      const [rows] = await db.query('SELECT * FROM peliculas WHERE titulo LIKE ?', [`%${titulo}%`]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Obtener películas por género
  getByGenero: async (generoId) => {
    try {
      const [rows] = await db.query(`
        SELECT p.* FROM peliculas p
        JOIN pelicula_genero pg ON p.id = pg.id_pelicula
        WHERE pg.id_genero = ?
      `, [generoId]);
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Obtener película con detalles (géneros)
  getDetalles: async (id) => {
    try {
      const [pelicula] = await db.query('SELECT * FROM peliculas WHERE id = ?', [id]);
      const [generos] = await db.query(`
        SELECT g.nombre FROM generos g
        JOIN pelicula_genero pg ON g.id = pg.id_genero
        WHERE pg.id_pelicula = ?
      `, [id]);
      
      if (pelicula.length === 0) return null;
      
      return {
        ...pelicula[0],
        generos: generos
      };
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Pelicula;