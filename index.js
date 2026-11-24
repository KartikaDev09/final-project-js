const API_KEY = '540343b4';
const moviesGrid = document.querySelector("#moviesGrid")
const resultsInfo = document.querySelector("#resultsInfo")
const searchInput = document.querySelector("#searchInput")
const searchForm = document.querySelector("#searchForm");
const errorPage = document.querySelector(".resultsInfo__errorPage")
const cta = document.querySelector("#cta")
const modal = document.querySelector("#modal")

// Edit Search button to reload page
document.querySelector('.resultsInfo__errorPage--btn').addEventListener('click', () => {
  window.location.reload();
});


let currentMovies = []
// Search movies
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  getMovies(searchTerm);
    
});

// show skeleton loading cards
function showSkeletons() {
  const skeletons = Array(10).fill(0).map(() => `
    <div class="movie-card movie-card--skeleton">
      <div class="movie-card__img movie-card__img--skeleton"></div>
      <div class="movie-card__title movie-card__title--skeleton"></div>
      <div class="movie-card__year movie-card__year--skeleton"></div>
    </div>  
  `).join('');

  moviesGrid.innerHTML = skeletons;
}


// fetch movies from API 
async function getMovies(searchTerm) {
    showSkeletons();
  const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
  const data = await response.json();

  if (data.Response === 'True') {
    currentMovies = data.Search;
    resultsInfo.textContent = `Showing: ${searchTerm}`;
    sortSelect.value = 'default';
    errorPage.style.display = "none";
    
    renderMovies(currentMovies)
    
  } else {
    resultsInfo.textContent = `Showing: ${searchTerm}`;
    moviesGrid.innerHTML = '<p></p>';
    errorPage.style.display = "block";
    cta.style.display = "none";
    modal.style.display = "none";
    sortSelect.style.display = "none";
    sortSelectLabel.style.display = "none";
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
// sort movies
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

// this part is for modal joinIn & signIn 
let isModalOpen = false;
function toggleModal(type) {
  if(isModalOpen) {
    isModalOpen = false;
    document.body.classList.remove("modal--open", "modal--joinIn", "modal--signIn", ".modal__joinIn-btn");
    return;
  }
  isModalOpen = true;
  document.body.classList.add("modal--open", `modal--${type}`, ".modal__joinIn-btn");
}


// this part handle the joinIn__email validation
function checkEmail() {
  const emailInput = document.querySelector(".joinIn__email-input");
  const submitBtn = document.getElementById("submitBtn");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Enable the button if the email is valid
    submitBtn.disabled = !emailRegex.test(emailInput.value);
  }

  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission
    toggleModal("joinIn"); // Call your toggleModal function here
  }

// this part is for modal loading & success for signIn(login)
  function login(event) {
    event.preventDefault();
    const modalLogin = document.querySelector(".modal__signIn");
    const loading = modalLogin.querySelector(".modal__overlay--loading");
    const success = modalLogin.querySelector(".modal__overlay--success");
    loading.classList.add("modal__overlay--visible");
    setTimeout(() => {
      try {
        const  isSuccess = true;
        if(!isSuccess) {
          console.log("Error: Something went wrong! Please try again.");
          throw new Error("Something went wrong! Please try again.");
          }      
          success.classList.add("modal__overlay--visible");
        } catch(error) {
          alert(error.message);
          loading.classList.remove("modal__overlay--visible"); 
        }
      }, 1000);
  }


  function join(event) {
    event.preventDefault();
    const modalJoin = document.querySelector(".modal__joinIn");
    const loading = modalJoin.querySelector(".modal__overlay--loading");    
    const success = modalJoin.querySelector(".modal__overlay--success");
    loading.classList.add("modal__overlay--visible");
    
      setTimeout(()=> {
        try {
          const isSuccess = true;
          
          if(!isSuccess) {
            console.log("Error: Something went wrong! Please try again.");
            throw new Error("Something went wrong! Please try again.");
          }
          success.classList.add("modal__overlay--visible");
      } catch (error) {
        alert(error.message);
        loading.classList.remove("modal__overlay--visible");
      }
    }, 1000);
    
    
}

// close-button event listener & .reset() for form fields. use this code approach because the close buttons use Font Awesome icons, which can replace the original <i> elements with SVG elemts after JS attaches the click Listener.
document.addEventListener('click', (event) => {
  if (event.target.closest('.modal__exit')) {
    document.querySelectorAll('.modal__overlay').forEach(overlay => {
      overlay.classList.remove('modal__overlay--visible');
      document.querySelectorAll('.modal__form').forEach(form => {
  form.reset();
});
    });

    isModalOpen = false;

    document.body.classList.remove(
      'modal--open',
      'modal--joinIn',
      'modal--signIn'
    );
  }
});

// this part for RESET button on the #modal__signIn-form
document.getElementById('resetButton').addEventListener('click', () => {
  document.getElementById('modal__signIn-form').reset();
  console.log("form has been reset");
});