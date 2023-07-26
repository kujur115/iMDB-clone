// script for the movies page which displays the details of a movie based on the imdbID passed in the params as ref

const movieDetail = document.getElementById("movie-detail-container");
const id = getParam("ref");
let FavourateMovies = [];

function init() {
  // function that loads first 
  const storedArrayString = localStorage.getItem("Favourites");
  FavourateMovies = JSON.parse(storedArrayString) || [];
  movieDetail.innerHTML=`<p>Loading</p>`
}

window.onload = init;

function getParam(key) {
  // function to get the id of the movie from the param in the url
  const address = window.location.search;
  const parameterList = new URLSearchParams(address);
  return parameterList.get(key);
}

function addToFav(movie) {
  // function to add/remove movies in the favourate list on called
  let isFavourite = FavourateMovies.some((mov) => mov.imdbID === movie.imdbID);
  const updatedMovies = isFavourite
    ? FavourateMovies.filter((mov) => mov.imdbID !== movie.imdbID)
    : [movie, ...FavourateMovies];

  FavourateMovies = updatedMovies;
  const arrayString = JSON.stringify(FavourateMovies);
  localStorage.setItem("Favourites", arrayString);
}

getMovieDetails(id);

async function getMovieDetails(imdbID) {
  // function to get the movies detail using the given id to make api call 
  const url = `https://www.omdbapi.com/?apikey=dd8897cf&i=${imdbID}&plot=full`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      addToDetails(data);
    } else {
      throw new Error("Network response was not OK.");
    }
  } catch (error) {
    console.error(error);
  }
}

function addToDetails(data) {
  // function to add the data in the  movie's detail page
  if (movieDetail) {
    movieDetail.innerHTML = `
    <div class="movie-nav">
    <div class="inner-container">
      <div class="element-container">
        <p>Cast & Crew</p>
      </div>
      <div class="element-container">
        <p>User reviews</p>
      </div>
      <div class="element-container">
        <p>Trivia</p>
      </div>
    </div>
  </div>
  <div class="title-container">
    <div class="title">
      <div class="movie-title">
        <p>${data.Title}</p>
      </div>
      <div class="title-inner-container">
        <div class="element-container">
          <p>${data.Year}</p>
        </div>
        <div class="element-container">
          <p>${data.Rated}</p>
        </div>
        <div class="element-container">
          <p>${data.Runtime}</p>
        </div>
      </div>
    </div>
    <div>
      <button class="fav"> Add To fav</button>
    </div>
    <div class="imdb-ratings">
      <div class="inner-container">
        <div class="element-container">
          <p class="r-title">iMDB RATING</p>
          <p class="r-val"><span class="text">${data.imdbRating}</span>/10</p>
        </div>
        <div class="element-container">
          <p class="r-title">YOUR RATING</p>
          <p class="r-val highlight">Rate</p>
        </div>
        <div class="element-container">
          <p class="r-title">POPULARITY</p>
          <p class="r-val">${data.Metascore}</p>
        </div>
      </div>
    </div>
  </div>
  <div class="poster-details-container">
    <img src="${data.Poster}" alt="" />
    <div class="movie">
      <div class="genre">
        <div class="element-container">
        ${data.Genre.split(",")
          .map((str) => `<p>${str.trim()}</p>`)
          .join("")}
          
        </div>
      </div>
      <div class="plot">
        <p>${data.Plot}</p>
      </div>
      <hr />
      <div class="details-crew">
        <p>
          <span class="text-highlight">Director</span>
          <span>${data.Director}</span>
        </p>
      </div>
      <hr />
      <div class="details-crew">
        <p>
          <span class="text-highlight">Writers</span>
          <span>${data.Writer}</span>
        </p>
      </div>
      <hr />
      <div class="details-crew">
        <p>
          <span class="text-highlight">Stars</span>
          <span>${data.Actors}</span>
        </p>
      </div>
      <hr />
      <div class="details-crew">
        <p>
          <span class="text-highlight">Languages</span>
          <span>${data.Language}</span>
        </p>
      </div>
      <hr />
      <div class="details-crew">
        <p>
          <span class="text-highlight">Country</span>
          <span>${data.Country}</span>
        </p>
      </div>
    </div>
  </div>
  <div class="ratings">
    <h5>Ratings</h5>
    <div class="rating-container"></div>
  </div>
    `;
    // add ratings list of the movies
    const rating = document.querySelector(".rating-container");
    if (rating) {
      for (let i = 0; i < data.Ratings.length; i++) {
        const r = document.createElement("div");
        r.setAttribute("class", "rating-movies");
        r.innerHTML = `
          <h5>${data.Ratings[i].Source}</h5>
          <p>${data.Ratings[i].Value}</p>
        `;
        rating.appendChild(r);
      }
    }

    // add favourate button to the page which adds/removes the movie from fav list
    const favButton = document.querySelector(".fav");
    if (favButton) {
      let isFavourite = FavourateMovies.some(
        (mov) => mov.imdbID === data.imdbID
      );
      function toggleFav(data) {
        // toggles the favourate button to add or remove the movie from fav list
        addToFav(data);
        isFavourite = FavourateMovies.some((mov) => mov.imdbID === data.imdbID);
        favButton.textContent = isFavourite ? "Remove from Fav" : "Add To Fav";
      }
      favButton.textContent = isFavourite ? "Remove from Fav" : "Add To Fav";

      // Event listener for button click
      favButton.addEventListener("click", () => toggleFav(data));
    }
  }
}
function renderFav() {}
function addLatestMovie() {}
