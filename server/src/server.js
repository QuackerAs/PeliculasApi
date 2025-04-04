const express = require('express');
const cors = require('cors');
const path = require('path');

// Importar rutas
const peliculaRoutes = require('../routes/peliculaRoutes');
const generoRoutes = require('../routes/generoRoutes');
const actorRoutes = require('../routes/actorRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api/peliculas', peliculaRoutes);
app.use('/api/generos', generoRoutes);
app.use('/api/actores', actorRoutes);

// Ruta principal para servir la aplicación
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});