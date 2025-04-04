document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos DOM
    const busquedaInput = document.getElementById('busqueda-input');
    const buscarBtn = document.getElementById('buscar-btn');
    const resultadosBusqueda = document.getElementById('resultados-busqueda');
    const peliculasPopulares = document.getElementById('peliculas-populares');
    const generoSelect = document.getElementById('genero-select');
    const resultadosFiltrado = document.getElementById('resultados-filtrado');
    
    // Bootstrap Modal
    const peliculaModal = new bootstrap.Modal(document.getElementById('pelicula-modal'));
    
    // URLs de la API
    const API_BASE = 'http://localhost:3001/api/peliculas';
    
    // Inicialización
    cargarPeliculasPopulares();
    cargarGeneros();
    
    // Event Listeners
    buscarBtn.addEventListener('click', buscarPeliculas);
    busquedaInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        buscarPeliculas();
      }
    });
    
    generoSelect.addEventListener('change', filtrarPorGenero);
    
    // Funciones
    async function buscarPeliculas() {
      const termino = busquedaInput.value.trim();
      
      if (!termino) {
        resultadosBusqueda.innerHTML = '<div class="alert alert-warning">Por favor, ingresa un término de búsqueda.</div>';
        return;
      }
      
      try {
        const response = await fetch(`${API_BASE}/buscar?titulo=${encodeURIComponent(termino)}`);
        const peliculas = await response.json();
        
        if (peliculas.length === 0) {
          resultadosBusqueda.innerHTML = '<div class="alert alert-info">No se encontraron películas que coincidan con tu búsqueda.</div>';
          return;
        }
        
        mostrarResultadosBusqueda(peliculas);
      } catch (error) {
        console.error('Error al buscar películas:', error);
        resultadosBusqueda.innerHTML = '<div class="alert alert-danger">Error al buscar películas. Intenta de nuevo más tarde.</div>';
      }
    }
    
    function mostrarResultadosBusqueda(peliculas) {
      resultadosBusqueda.innerHTML = `
        <div class="table-responsive">
          <table class="table table-hover tabla-resultados">
            <thead class="table-dark">
              <tr>
                <th>Título</th>
                <th>Calificación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${peliculas.map(pelicula => `
                <tr>
                  <td>${pelicula.titulo}</td>
                  <td>${pelicula.calificacion}</td>
                  <td>
                    <button class="btn btn-sm btn-primary ver-detalles" data-id="${pelicula.id}">
                      Ver detalles
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      
      // Agregar event listeners a los botones de detalles
      document.querySelectorAll('.ver-detalles').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-id');
          cargarDetallesPelicula(id);
        });
      });
    }
    
    async function cargarPeliculasPopulares() {
      try {
        const response = await fetch(`${API_BASE}/populares`, {
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const peliculas = await response.json();
        
        peliculasPopulares.innerHTML = peliculas.map(pelicula => `
          <div class="col-md-4 col-lg-3 mb-4">
            <div class="card pelicula-card">
              <div class="card-body">
                <h5 class="card-title">${pelicula.titulo}</h5>
                <span class="badge calificacion-badge">${pelicula.calificacion}</span>
                <p class="card-text">${pelicula.resumen.substring(0, 80)}...</p>
                <button class="btn btn-primary ver-detalles-popular" data-id="${pelicula.id}">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        `).join('');
        
        // Agregar event listeners a los botones
        document.querySelectorAll('.ver-detalles-popular').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            cargarDetallesPelicula(id);
          });
        });
      } catch (error) {
        console.error('Error al cargar películas populares:', error);
        peliculasPopulares.innerHTML = '<div class="alert alert-danger">Error al cargar películas populares.</div>';
      }
    }
    
    async function cargarGeneros() {
      try {
        const response = await fetch(`${API_BASE}/generos`, {
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const generos = await response.json();
        
        generoSelect.innerHTML = `
          <option value="">Seleccionar género...</option>
          ${generos.map(genero => `
            <option value="${genero.id}">${genero.nombreGenero}</option>
          `).join('')}
        `;
      } catch (error) {
        console.error('Error al cargar géneros:', error);
        generoSelect.innerHTML = '<option>Error al cargar géneros</option>';
      }
    }
    
    async function filtrarPorGenero() {
      const generoId = generoSelect.value;
      
      if (!generoId) {
        resultadosFiltrado.innerHTML = '';
        return;
      }
      
      try {
        const response = await fetch(`${API_BASE}/genero/${generoId}`);
        const peliculas = await response.json();
        
        if (peliculas.length === 0) {
          resultadosFiltrado.innerHTML = '<div class="alert alert-info">No hay películas disponibles para este género.</div>';
          return;
        }
        
        resultadosFiltrado.innerHTML = peliculas.map(pelicula => `
          <div class="col-md-4 col-lg-3 mb-4">
            <div class="card pelicula-card">
              <div class="card-body">
                <h5 class="card-title">${pelicula.titulo}</h5>
                <span class="badge calificacion-badge">${pelicula.calificacion}</span>
                <p class="card-text">${pelicula.resumen.substring(0, 80)}...</p>
                <button class="btn btn-primary ver-detalles-filtrado" data-id="${pelicula.id}">
                  Ver detalles
                </button>
              </div>
            </div>
          </div>
        `).join('');
        
        // Agregar event listeners a los botones
        document.querySelectorAll('.ver-detalles-filtrado').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            cargarDetallesPelicula(id);
          });
        });
      } catch (error) {
        console.error('Error al filtrar por género:', error);
        resultadosFiltrado.innerHTML = '<div class="alert alert-danger">Error al filtrar películas.</div>';
      }
    }
    
    async function cargarDetallesPelicula(id) {
      try {
        const response = await fetch(`${API_BASE}/detalles/${id}`);
        const pelicula = await response.json();
        
        // Actualizar el contenido del modal
        document.getElementById('pelicula-modal-titulo').textContent = pelicula.titulo;
        
        document.getElementById('pelicula-modal-contenido').innerHTML = `
          <div class="detalles-header">
            <span class="detalles-calificacion">★ ${pelicula.calificacion}</span>
          </div>
          
          <h5>Sinopsis</h5>
          <p>${pelicula.resumen}</p>
          
          <div class="detalles-generos">
            <h5>Géneros</h5>
            <div>
              ${pelicula.generos.map(genero => `
                <span class="badge genero-badge">${genero}</span>
              `).join('')}
            </div>
          </div>
          
          <div class="lista-actores">
            <h5>Reparto</h5>
            <ul class="list-group">
              ${pelicula.reparto.map(actor => `
                <li class="list-group-item">${actor}</li>
              `).join('')}
            </ul>
          </div>
        `;
        
        // Mostrar el modal
        peliculaModal.show();
      } catch (error) {
        console.error('Error al cargar detalles de la película:', error);
        alert('Error al cargar detalles de la película.');
      }
    }
  });