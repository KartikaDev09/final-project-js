
const moviesGrid = document.querySelector("#moviesGrid")
const resultsInfo = document.querySelector("#resultsInfo")
let currentMovies = []

async function getMovies(searchTerm) {
  resultsInfo.innerHTML = `Showing: ${searchTerm}`
const search = await fetch(`https://www.omdbapi.com/?apikey=540343b4&s=${searchTerm}`);
const data = await search.json();
currentMovies = data.Search.slice(0, 10)
renderMovies(currentMovies);
}

function onSearchChange(event) {
  const searchTerm = event.target.value
  getMovies(searchTerm);
}

function renderMovies(movies) {
  
  moviesGrid.innerHTML = movies.map((movie) => {
  return `<div class="movie-card">
      <img
        class="movie-card__img"
        src= "${movie.Poster}"
        alt="${movie.Title}"
        onerror="this.outerHTML='<div class=&quot;movie-card__poster-placeholder&quot;>Movie Poster<br />Not Available</div>'"
      />
      <h2 class="movie-card__title">${movie.Title}</h2>
      <p class="movie-card__year">${movie.Year}</p>
    </div>`;
  }).join("");
}


