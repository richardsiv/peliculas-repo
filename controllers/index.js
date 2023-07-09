import { apiKey, apiUrl } from "./api.js";

// * Funcionalidad botones *
const inputBuscar = document.getElementById("input-buscar");
const botonBuscar = document.getElementById("boton-buscar");
const tarjetas = document.getElementById("tarjetas");

// *Componentes HTML*
const iconoEstrella = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>`
const iconoLuna = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16">
<path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
</svg>`
const iconoSol = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16">
<path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
</svg>`

function obtenerPeliculasPopulares() {
  const url = `${apiUrl}/movie/popular?api_key=${apiKey}&language=es-ES&page=1`;
  fetch(url)
    .then((response) => response.json())
    .then(({results: peliculas}) => {
      tarjetas.innerHTML = "";
      renderizarCartas(peliculas)
    })
    .catch((error) => {
      alert("Ocurrió un error al obtener las películas populares: " + error);
    });
}

function buscarPeliculas() {
  const texto = inputBuscar.value;
  if (!texto) return alert("Por favor, ingresa un texto para buscar una película.");
    const url = `${apiUrl}/search/movie?api_key=${apiKey}&language=es-ES&query=${texto}&page=1`;
    fetch(url)
      .then((response) => response.json())
      .then(({results: peliculas}) => {
        tarjetas.innerHTML = "";
        renderizarCartas(peliculas)
      })
      .catch((error) => {
        alert("Ocurrió un error al buscar las películas: " + error);
      });
}

function renderizarCartas(peliculas) {

  for (let pelicula of peliculas) {

    const carta = document.createElement("div");
    carta.innerHTML = `
      <div class="col">
        <div class="card shadow-sm rounded-4 rounded-bottom-0">
          <img src="https://image.tmdb.org/t/p/w500${pelicula.backdrop_path ? pelicula.backdrop_path : pelicula.poster_path}" alt="Poster de la película" width="100%" height="225" class="object-fit-cover rounded-top"
          >

          <div class="card-body">

            <h5 class="card-title">${pelicula.title}</h5>
            <div class="d-flex justify-content-between align-items-center">
              <span>
                ${iconoEstrella} ${pelicula.vote_average} / 10
              </span>
              <small class="text-muted">${pelicula.release_date.slice(0,4)}</small>
            </div>
              <button type="button" class="btn btn-sm btn-outline-secondary mt-2">Ver más</button>
          </div>
        </div>
      </div>
    `

    carta.addEventListener("click", () => {
      window.location.href = `detalles.html?id=${pelicula.id}`;
    });
    tarjetas.appendChild(carta);
  }
}

// *Funcionalidad de inicio*
window.addEventListener("load", obtenerPeliculasPopulares);

// *Funcionalidad buscador*
botonBuscar.addEventListener("click", buscarPeliculas);
inputBuscar.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    buscarPeliculas();
  }
});

// *Funcionalidad Tema*
const botonCambiarTema = document.getElementById("boton-tema")
botonCambiarTema.addEventListener("click", () => {
  cambiarTema()
});

botonCambiarTema.innerHTML = iconoSol

function cambiarTema() {

  const temaActual = document.querySelector("body").getAttribute("data-bs-theme")

  if (temaActual === "light") {
    botonCambiarTema.innerHTML = iconoLuna
    
    document.querySelector("body").setAttribute("data-bs-theme", "dark")
  } else {
    botonCambiarTema.innerHTML = iconoSol
    document.querySelector("body").setAttribute("data-bs-theme", "light")
  }

}