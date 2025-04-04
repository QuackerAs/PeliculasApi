-- Crear y usar la base de datos
CREATE DATABASE peliculas;
USE peliculas;

-- Tabla de Películas
CREATE TABLE IF NOT EXISTS peliculas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    calificacion DECIMAL(3,1) CHECK (calificacion >= 0 AND calificacion <= 10),
    resumen TEXT,
    id_pelicula INT UNIQUE
);

-- Tabla de Géneros
CREATE TABLE IF NOT EXISTS generos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombreGenero VARCHAR(50) NOT NULL UNIQUE,
    id_genero INT UNIQUE
);

-- Tabla intermedia Película-Género (relación N:M)
CREATE TABLE IF NOT EXISTS pelicula_genero (
    id_pelicula INT NOT NULL,
    id_genero INT NOT NULL,
    PRIMARY KEY (id_pelicula, id_genero),
    FOREIGN KEY (id_pelicula) REFERENCES peliculas(id) ON DELETE CASCADE,
    FOREIGN KEY (id_genero) REFERENCES generos(id) ON DELETE CASCADE
);

-- Tabla de Actores
CREATE TABLE IF NOT EXISTS actores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    actor VARCHAR(100) NOT NULL,
    id_actor INT UNIQUE
);

-- Tabla de Reparto (relación N:M entre películas y actores)
CREATE TABLE IF NOT EXISTS reparto (
    id_pelicula INT NOT NULL,
    id_actor INT NOT NULL,
    PRIMARY KEY (id_pelicula, id_actor),
    FOREIGN KEY (id_pelicula) REFERENCES peliculas(id) ON DELETE CASCADE,
    FOREIGN KEY (id_actor) REFERENCES actores(id) ON DELETE CASCADE
);

-- Insertar datos de muestra para películas
INSERT INTO peliculas (titulo, calificacion, resumen) VALUES
('Inception', 8.8, 'Un ladrón que roba secretos a través de los sueños.'),
('Interstellar', 9.0, 'Un equipo de astronautas viaja a través de un agujero de gusano.'),
('The Matrix', 8.7, 'Un hacker descubre la verdad sobre su realidad.'),
('The Dark Knight', 9.1, 'Batman enfrenta al Joker en Gotham.'),
('Pulp Fiction', 8.9, 'Historias entrelazadas del mundo criminal.');

-- Insertar datos de muestra para géneros
INSERT INTO generos (nombreGenero) VALUES
('Ciencia Ficción'),
('Acción'),
('Drama'),
('Fantasía'),
('Thriller');

-- Relacionar películas con géneros
INSERT INTO pelicula_genero (id_pelicula, id_genero) VALUES
(1, 1), -- Inception - Ciencia Ficción
(1, 2), -- Inception - Acción
(2, 1), -- Interstellar - Ciencia Ficción
(2, 3), -- Interstellar - Drama
(3, 1), -- Matrix - Ciencia Ficción
(3, 2), -- Matrix - Acción
(4, 2), -- Dark Knight - Acción
(4, 5), -- Dark Knight - Thriller
(5, 3), -- Pulp Fiction - Drama
(5, 5); -- Pulp Fiction - Thriller

-- Insertar datos de muestra para actores
INSERT INTO actores (actor) VALUES
('Leonardo DiCaprio'),
('Matthew McConaughey'),
('Keanu Reeves'),
('Christian Bale'),
('John Travolta'),
('Ellen Page'),
('Anne Hathaway'),
('Laurence Fishburne'),
('Heath Ledger'),
('Samuel L. Jackson');

-- Relacionar películas con actores (reparto)
INSERT INTO reparto (id_pelicula, id_actor) VALUES
(1, 1), -- Inception - Leonardo DiCaprio
(1, 6), -- Inception - Ellen Page
(2, 2), -- Interstellar - Matthew McConaughey
(2, 7), -- Interstellar - Anne Hathaway
(3, 3), -- Matrix - Keanu Reeves
(3, 8), -- Matrix - Laurence Fishburne
(4, 4), -- Dark Knight - Christian Bale
(4, 9), -- Dark Knight - Heath Ledger
(5, 5), -- Pulp Fiction - John Travolta
(5, 10); -- Pulp Fiction - Samuel L. Jackson