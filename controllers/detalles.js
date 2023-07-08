
import { apiKey, apiUrl } from "./api.js";

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
      const original_language = pelicula.original_language; 

      console.log("Título:", title);
      console.log("Géneros:", genres);
      console.log("Duración:", runtime);
      console.log("Sinopsis:", overview);
      console.log("Reparto:", cast);
      console.log("Videos:", videos);
      console.log("Dinero recaudado:", revenue);
      console.log("Lenguaje oficial:", original_language);
    })
    .catch((error) => {
      // Si da chande agregar un alert bonito.
      alert("Ocurrió un error al obtener los datos de la película: " + error);
    });
}


// *Funcionalidad de inicio*
// window.addEventListener("load", () => {
//   const id = obtenerId();
//   obtenerDatosPelicula(id);
// });

// *Funcionalidad boton*
botonVolver.addEventListener("click", () => {
  window.location.href = "index.html";
});