
import { apiKey, apiUrl } from "./api.js";

const botonVolver = document.getElementById("boton-volver");
const banner = document.getElementById("banner");
const video = document.getElementById("video");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const fecha = document.getElementById("fecha");
const generos = document.getElementById("generos");
const calificacion = document.getElementById("calificacion");

function obtenerId() {
  const url = window.location.href;
  const urlObj = new URL(url);

  const id = urlObj.searchParams.get("id");
  return id;
}

function obtenerDatosPelicula(id) {
  const url = `${apiUrl}/movie/${id}?api_key=${apiKey}&language=es-ES`;
  fetch(url)
    .then((response) => response.json())
    .then(({title, overview, release_date, genres, vote_average, backdrop_path}) => {
      banner.style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${backdrop_path})`;
      titulo.textContent = title;
      descripcion.textContent = overview;
      fecha.textContent = `Fecha de estreno: ${release_date}`;
      generos.textContent = `Géneros: ${genres.map((g) => g.name).join(", ")}`;
      calificacion.textContent = `Calificación: ${vote_average}/10`;

      obtenerVideoPelicula(id);
    })
    .catch((error) => {
      // Si da chande agregar un alert bonito.
      alert("Ocurrió un error al obtener los datos de la película: " + error);
    });
}

function obtenerVideoPelicula(id) {
  const url = `${apiUrl}/movie/${id}/videos?api_key=${apiKey}&language=es-ES`;
  fetch(url)
    .then((response) => response.json())
    .then(({results: videos}) => {

      if (videos.length > 0) {
        const video = videos[0];

        if (video.site === "YouTube") {
          const iframe = document.createElement("iframe");

          iframe.src = `https://www.youtube.com/embed/${video.key}`;
          iframe.width = "560";
          iframe.height = "315";

          video.appendChild(iframe);
        } else {
          video.textContent = "No se encontró un video de YouTube para esta película.";

        }
      } else {
        video.textContent = "No se encontró ningún video para esta película.";
      }

    })
    .catch((error) => {
      // Si da chande agregar un alert bonito.
      alert("Ocurrió un error al obtener el video de la película: " + error);
    });
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