
import { apiKey, apiUrl } from "./api.js";

// *Componentes HTML*
const iconoEstrella = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>`
const iconoReloj = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
<path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
</svg>`

const iconoLuna = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon" viewBox="0 0 16 16">
<path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z"/>
</svg>`
const iconoSol = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16">
<path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
</svg>`

// *Utilidades*
const lenguajes = {
  "en": "Inglés",
  "es": "Español",
  "zh": "Chino",
  "hi": "Hindi",
  "ar": "Árabe",
  "pt": "Portugués",
  "fr": "Francés",
  "ru": "Ruso",
  "bn": "Bengalí",
  "de": "Alemán"
};

function obtenerLenguaje(codigo) {
  if (lenguajes[codigo]) {
    return lenguajes[codigo];
  }
  else {
    return "Código no válido o no encontrado";
  }
}

function obtenerId() {
  const url = window.location.href;
  const urlObj = new URL(url);

  const id = urlObj.searchParams.get("id");
  return id;
}

function obtenerDatosPelicula(id) {

  const urlDetalles = `${apiUrl}/movie/${id}?api_key=${apiKey}&append_to_response=videos,credits`;

  fetch(urlDetalles)
    .then((response) => response.json())
    .then((pelicula) => {
      const title = pelicula.title; 
      const genres = pelicula.genres; 
      const runtime = pelicula.runtime; 
      const overview = pelicula.overview;
      const cast = pelicula.credits.cast; 
      const videos = pelicula.videos.results; 
      const revenue = pelicula.revenue; 
      const average = pelicula.vote_average; 
      const count = pelicula.vote_count; 
      const backdrop = pelicula.backdrop_path; 
      const original_language = pelicula.original_language; 

      renderizarBanner(title, genres, average, runtime, backdrop)
      renderizarDetalles(overview, revenue, count, original_language)
      renderizarCartas(cast)
      renderizarVideos(videos)
    })
    .catch((error) => {
      alert("Ocurrió un error al obtener los datos de la película: " + error);
    });
}

function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}

// *Renderizar componentes*
function renderizarBanner(titulo, generos, puntuacion, duracion, backdrop) {
  const tituloPelicula = document.getElementById("tituloPelicula");
  const generosPelicula = document.getElementById("generosPelicula");
  const puntuacionPelicula = document.getElementById("puntuacionPelicula");
  const duracionPelicula = document.getElementById("duracionPelicula");

  const containerBanner = document.getElementById("containerBanner");
  const banner = document.createElement("img");
  banner.src = `https://image.tmdb.org/t/p/w500${backdrop}`;
  banner.classList.add("img-fluid", "rounded-3", "shadow-lg")

  const { hours, minutes } = toHoursAndMinutes(duracion)

  containerBanner.appendChild(banner)

  tituloPelicula.innerText = titulo;
  puntuacionPelicula.innerHTML = `${iconoEstrella}: ${puntuacion} / 10`;
  duracionPelicula.innerHTML = `${iconoReloj}: ${hours}:${minutes}hr`;
  generosPelicula.innerText = `${generos.map((g) => g.name).join(", ")}`;
}

function renderizarDetalles(sinopsis, dinero, reviews, lenguaje) {
  const detallesPelicula = document.getElementById("detallesPelicula");
  const dineroPelicula = document.getElementById("dineroPelicula");
  const reviewsPelicula = document.getElementById("reviewsPelicula");
  const lenguajePelicula = document.getElementById("lenguajePelicula");

  detallesPelicula.innerText = sinopsis;
  dineroPelicula.innerHTML = `$ ${separarPorPuntos(dinero)}`;
  reviewsPelicula.innerHTML = `${separarPorPuntos(reviews)}`;
  lenguajePelicula.innerText = `${obtenerLenguaje(lenguaje)}`;
}

function renderizarCartas(repartos) {
  let repartosAgregados = 0;
  for (let reparto of repartos) {

    repartosAgregados++;
    if (repartosAgregados > 8) return

    const carta = document.createElement("div");
    carta.innerHTML = `
      <div class="col">
        <div class="card shadow-sm rounded-4 rounded-bottom-0">
          <img src="https://www.themoviedb.org/t/p/w138_and_h175_face/${reparto.profile_path}" alt="Poster de la película" width="100%" height="225" class="object-fit-cover rounded-top"
          >

          <div class="card-body">
            <h5 class="card-title">${reparto.name}</h5>
            <div class="card-text">Personaje: 
              <small class="text-muted">${reparto.character}</small>
            </div>
          </div>
        </div>
      </div>
    `

    tarjetas.appendChild(carta);
  }
}

function renderizarVideos(listaVideos) {
  const videosContainer = document.getElementById("videos");
  let videosAgregados = 0;

  for (let video of listaVideos) {
    console.log(video)

    videosAgregados++;
    if (videosAgregados > 4 || video.site !== "YouTube") return

    const cartaVideo = document.createElement("div");
    cartaVideo.innerHTML = `
      <div class="col">
        <div class="card">
          <div class="ratio ratio-16x9">
            <iframe src="https://www.youtube.com/embed/${video.key}" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
          </div>
          <div class="card-body">
            <h5 class="card-title">${video.name}</h5>
            <p class="card-text">${video.type}</p>
          </div>
        </div>
      </div>
    `

    videosContainer.appendChild(cartaVideo);
  }
}

// *Funcionalidad de inicio*
window.addEventListener("load", () => {
  const id = obtenerId();
  obtenerDatosPelicula(id);
});

// *Funcionalidad boton*
// botonVolver.addEventListener("click", () => {
//   window.location.href = "index.html";
// });

function separarPorPuntos(numero) {
  if (typeof numero === "string") {
    numero = Number(numero);
  }
  return numero.toLocaleString("de-DE");
}

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