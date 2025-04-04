const db = require('../config/database');

const PeliculasModel = {
  // Búsqueda de películas por título
  buscarPorTitulo: async (titulo) => {
    try {
      const [rows] = await db.query(
        'SELECT p.id, p.titulo, p.calificacion, p.resumen FROM peliculas p WHERE p.titulo LIKE ?',
        [`%${titulo}%`]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Obtener lista de películas populares (ordenadas por calificación)
  obtenerPopulares: async () => {
    try {
      const [rows] = await db.query(
        'SELECT id, titulo, calificacion, resumen FROM peliculas ORDER BY calificacion DESC LIMIT 10'
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Obtener detalles de una película específica
  obtenerDetalles: async (id) => {
    try {
      // Obtener información básica de la película
      const [pelicula] = await db.query(
        'SELECT p.id, p.titulo, p.calificacion, p.resumen FROM peliculas p WHERE p.id = ?',
        [id]
      );
      
      // Obtener géneros de la película
      const [generos] = await db.query(
        'SELECT g.nombreGenero FROM generos g ' +
        'JOIN pelicula_genero pg ON g.id = pg.id_genero ' +
        'WHERE pg.id_pelicula = ?',
        [id]
      );
      
      // Obtener actores de la película
      const [reparto] = await db.query(
        'SELECT a.actor FROM actores a ' +
        'JOIN reparto r ON a.id = r.id_actor ' +
        'WHERE r.id_pelicula = ?',
        [id]
      );
      
      // Combinar toda la información
      if (pelicula.length > 0) {
        return {
          ...pelicula[0],
          generos: generos.map(g => g.nombreGenero),
          reparto: reparto.map(a => a.actor)
        };
      }
      return null;
    } catch (error) {
      throw error;
    }
  },

  // Filtrar películas por género
  filtrarPorGenero: async (idGenero) => {
    try {
      const [rows] = await db.query(
        'SELECT p.id, p.titulo, p.calificacion, p.resumen FROM peliculas p ' +
        'JOIN pelicula_genero pg ON p.id = pg.id_pelicula ' +
        'WHERE pg.id_genero = ?',
        [idGenero]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  },

  // Obtener todos los géneros disponibles
  obtenerGeneros: async () => {
    try {
      const [rows] = await db.query('SELECT id, nombreGenero FROM generos');
      return rows;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = PeliculasModel;