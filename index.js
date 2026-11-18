const API_KEY = '540343b4';
const moviesGrid = document.querySelector("#moviesGrid")
const resultsInfo = document.querySelector("#resultsInfo")
const searchInput = document.querySelector("#searchInput")
const searchForm = document.querySelector("#searchForm");

let currentMovies = []

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  getMovies(searchTerm);
    
});


async function getMovies(searchTerm) {
  
  const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
  const data = await response.json();

  if (data.Response === 'True') {
    currentMovies = data.Search;
    resultsInfo.textContent = `Showing: ${searchTerm}`;
    sortSelect.value = 'default';
    renderMovies(currentMovies);
  } else {
    resultsInfo.textContent = `Showing: ${searchTerm}`;
    moviesGrid.innerHTML = `<p>"Oops! We couldn't find the movie you were looking for. Try searching for another title and please check the spelling!"</p>`;
    currentMovies = [];
  }
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