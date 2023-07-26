// script to render favourate page 
// page renders all the movies that are in favourate list
const favSection = document.getElementById("favourites-detail-container");
let FavourateMovies = [];
function init() {
  const storedArrayString = localStorage.getItem("Favourites");
  FavourateMovies = JSON.parse(storedArrayString) || [];
  renderFav();
}

window.onload = init;

function addToFav(movie, isFavourite) {
  // function to add movie to fav or remove from fav
  const storedArrayString = localStorage.getItem("Favourites");
  FavourateMovies = JSON.parse(storedArrayString) || [];

  if (isFavourite) {
    FavourateMovies = FavourateMovies.filter(
      (mov) => mov.imdbID !== movie.imdbID
    );
  } else {
    FavourateMovies.unshift(movie);
  }

  const arrayString = JSON.stringify(FavourateMovies);
  localStorage.setItem("Favourites", arrayString);
  renderFav();
}
function renderFav() {
  // function to render each movie from the favourate list
  const storedArrayString = localStorage.getItem("Favourites");
  FavourateMovies = JSON.parse(storedArrayString) || [];

  if (FavourateMovies.length === 0) {
    favSection.textContent = "No Movies in favourates list";
    return;
  }
  const fragment = document.createDocumentFragment();

  FavourateMovies.forEach((movie) => {
    const div = document.createElement("div");
    div.setAttribute("class", "movie-card");

    const link = document.createElement("a");
    link.href = `./movie.html?ref=${movie.imdbID}`;

    const img = document.createElement("img");
    img.src = movie.Poster;
    img.alt = "";

    link.appendChild(img);
    div.appendChild(link);

    const ratings = document.createElement("div");
    ratings.setAttribute("class", "card-ratings");
    const ratingText = document.createElement("p");
    ratingText.textContent = movie.imdbRating ? movie.imdbRating : 8.4;
    ratings.appendChild(ratingText);
    div.appendChild(ratings);

    const title = document.createElement("div");
    title.setAttribute("class", "card-title");
    const titleText = document.createElement("p");
    titleText.textContent = movie.Title;
    title.appendChild(titleText);
    div.appendChild(title);

    const watchlist = document.createElement("div");
    watchlist.setAttribute("class", "card-watchlist");
    const favButton = document.createElement("button");

    let isFavourite = FavourateMovies.some(
      (mov) => mov.imdbID === movie.imdbID
    );
    favButton.textContent = isFavourite ? "Remove from Fav" : "Add To Fav";
    favButton.addEventListener("click", () => addToFav(movie, isFavourite));
    watchlist.appendChild(favButton);
    div.appendChild(watchlist);

    fragment.appendChild(div);
  });
  favSection.innerHTML = "";
  favSection.appendChild(fragment);
  return;
}
