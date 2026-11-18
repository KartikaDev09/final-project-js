
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

const searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = document.querySelector("#searchInput").value;
  getMovies(searchTerm);
  
});

const sortSelect = document.querySelector("#sortSelect")

sortSelect.addEventListener('change', (e) => {sortMovies(e.target.value);
})

function sortMovies(sortType) {
  let sortedMovies = [...currentMovies];

  if(sortType === 'a-z') {
  sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (sortType === 'z-a') {
  sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  } else if (sortType === 'newest') {
  sortedMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
  } else if (sortType === 'oldest') {
  sortedMovies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
  }   

  renderMovies(sortedMovies);
}