import { apiKey, apiUrl } from "./api.js";

// * Funcionalidad botones *
const inputBuscar = document.getElementById("input-buscar");
const botonBuscar = document.getElementById("boton-buscar");
const tarjetas = document.getElementById("tarjetas");

// *Componentes HTML*
const iconoEstrella = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
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
      // Si da chande agregar un alert bonito.
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
        // Si da chande agregar un alert bonito.
        alert("Ocurrió un error al buscar las películas: " + error);
      });
}

function renderizarCartas(peliculas) {

  for (let pelicula of peliculas) {
    console.log(pelicula)

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