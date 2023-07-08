// * Funcionalidad botones *
const inputBuscar = document.getElementById("input-buscar");
const botonBuscar = document.getElementById("boton-buscar");
const tarjetas = document.getElementById("tarjetas");

// * Funcionalidad API *
const apiKey = "d8410a443d3245f70eb5951849b00d90";
const apiUrl = "https://api.themoviedb.org/3";


function obtenerPeliculasPopulares() {
  const url = `${apiUrl}/movie/popular?api_key=${apiKey}&language=es-ES&page=1`;
  fetch(url)
    .then((response) => response.json())
    .then(({results: peliculas}) => {
      // const peliculas = data.results;
      tarjetas.innerHTML = "";

      for (let pelicula of peliculas) {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");

        const imagen = document.createElement("img");
        imagen.src = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;

        const titulo = document.createElement("h3");
        titulo.textContent = pelicula.title;

        tarjeta.appendChild(imagen);
        tarjeta.appendChild(titulo);
        tarjeta.addEventListener("click", () => {
          window.location.href = `detalles.html?id=${pelicula.id}`;
        });
        tarjetas.appendChild(tarjeta);
      }

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
        // const peliculas = data.results;
        tarjetas.innerHTML = "";

        for (let pelicula of peliculas) {
          const tarjeta = document.createElement("div");
          tarjeta.classList.add("tarjeta");

          const imagen = document.createElement("img");
          imagen.src = `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`;

          const titulo = document.createElement("h3");
          titulo.textContent = pelicula.title;

          tarjeta.appendChild(imagen);
          tarjeta.appendChild(titulo);
          tarjeta.addEventListener("click", () => {
            window.location.href = `detalles.html?id=${pelicula.id}`;
          });
          tarjetas.appendChild(tarjeta);
        }
      })
      .catch((error) => {
        // Si da chande agregar un alert bonito.
        alert("Ocurrió un error al buscar las películas: " + error);
      });
}

// *Funcionalidad de inicio*
window.addEventListener("load", obtenerPeliculasPopulares);

// Llamar a la función buscarPeliculas cuando se