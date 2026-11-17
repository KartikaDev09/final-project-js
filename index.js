
const moviesGrid = document.querySelector("#moviesGrid")
console.log(moviesGrid);

async function getMovies(searchTerm) {
const search = await fetch(`https://www.omdbapi.com/?apikey=540343b4&s=${searchTerm}`);
const data = await search.json();
renderMovies(data.Search);
}

function onSearchChange(event) {
  const searchTerm = event.target.value
  getMovies(searchTerm);
}

function renderMovies(movies) {
  
  moviesGrid.innerHTML = movies.map((movie) => {
  return
    `<div class="movie-card">
      <img
        class="movie-card__img"
        src= "${movie.Poster}"
        alt="${movie.Title}"
      />
      <h2 class="movie-card__title">${movie.Title}</h2>
      <p class="movie-card__year">${movie.Year}</p>
    </div>`;
  });
  
}

