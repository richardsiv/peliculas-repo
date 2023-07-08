
import { apiKey, apiUrl } from "./api.js";

// *Componentes HTML*
const iconoEstrella = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>`
const iconoReloj = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
<path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
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

      console.log("Título:", title);
      console.log("Géneros:", genres);
      console.log("Duración:", runtime);
      console.log("Sinopsis:", overview);
      console.log("Reparto:", cast);
      console.log("Videos:", videos);
      console.log("Dinero recaudado:", revenue);
      console.log("average:", average);
      console.log("Lenguaje oficial:", original_language);

      renderizarBanner(title, genres, average, runtime, backdrop)
      renderizarDetalles(overview, revenue, count, original_language)
      renderizarCartas(cast)
    })
    .catch((error) => {
      // Si da chande agregar un alert bonito.
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
  console.log('separado por puntos', separarPorPuntos(dinero))

  detallesPelicula.innerText = sinopsis;
  dineroPelicula.innerHTML = `$${separarPorPuntos(dinero)}`;
  reviewsPelicula.innerHTML = `${separarPorPuntos(reviews)}`;
  lenguajePelicula.innerText = `${obtenerLenguaje(lenguaje)}`;
}

function renderizarCartas(repartos) {

  for (let reparto of repartos) {
    console.log(reparto)
    if (reparto.cast_id > 10) return

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

    carta.addEventListener("click", () => {
      window.location.href = `detalles.html?id=${reparto.id}`;
    });
    tarjetas.appendChild(carta);
  }
}

// *Funcionalidad de inicio*
window.addEventListener("load", () => {
  const id = obtenerId();
  obtenerDatosPelicula(id);
});

// *Funcionalidad boton*
botonVolver.addEventListener("click", () => {
  window.location.href = "index.html";
});

function separarPorPuntos(numero) {
  if (typeof numero === "string") {
    numero = Number(numero);
  }
  return numero.toLocaleString("de-DE");
}