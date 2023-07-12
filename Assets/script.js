const latestMovies = [
  {
    Title: "Black Adam",
    imdbID: "tt6443346",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYzZkOGUwMzMtMTgyNS00YjFlLTg5NzYtZTE3Y2E5YTA5NWIyXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg",
  },

  {
    Title: "Avatar: The Way of Water",
    Year: "2022",
    imdbID: "tt1630029",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg",
  },
  {
    Title: "The Guardians of the Galaxy: Holiday Special",
    Year: "2022",
    imdbID: "tt13623136",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOGJjMzlmNzctMWI4Yi00MjcyLWFmYzAtN2JmZjU0YTM4YmRmXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
  },
  {
    Title: "The Elephant Whisperers",
    Year: "2022",
    imdbID: "tt23628262",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWQ4ZjE5YjEtN2JkNC00NGExLTkzNDYtMDQ1YTcyZjU1NzY4XkEyXkFqcGdeQXVyMTUyNjc4OTIx._V1_SX300.jpg",
  },
  {
    Title: "Murder Mystery 2",
    Year: "2023",
    imdbID: "tt15255288",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BODkzMmQ1OGItYTZkNi00NGMxLWJiMjMtZmY0YzdjNDE3NWRjXkEyXkFqcGdeQXVyMjAwNzczNTU@._V1_SX300.jpg",
  },
  {
    Title: "Pathaan",
    Year: "2023",
    imdbID: "tt12844910",
    Type: "movie",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BM2QzM2JiNTMtYjU4Ny00MDZkLTk3MmUtYTRjMzVkZGJlNmYyXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg",
  },
];

const movieDetail = document.getElementById("movie-detail-container");
const movieContainer = document.getElementsByClassName("card-container")[0];
// console.log(movieContainer);
const favSection = document.getElementById("fav-section");

let FavourateMovies = [];

function addLatestMovie() {
  const fragment = document.createDocumentFragment();

  latestMovies.forEach((movie) => {
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
    ratingText.textContent = "8.4";
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
  // movieContainer.forEach((container) => {
  //   container.appendChild(fragment);
  // });
  movieContainer.innerHTML="";
  movieContainer.appendChild(fragment);
}

function renderFav() {
  const storedArrayString = localStorage.getItem("Favourites");
  FavourateMovies = JSON.parse(storedArrayString) || [];

  if (FavourateMovies.length === 0) {
    favSection.textContent = "";
    return;
  }

  const favContainer = document.createElement("div");
  favContainer.setAttribute("class", "fav-container");

  const favHeading = document.createElement("h4");
  favHeading.textContent = "Favourites";

  FavourateMovies.forEach((movie) => {
    const a = document.createElement("a");
    a.href = `./movie.html?ref=${movie.imdbID}`;

    const favCard = document.createElement("div");
    favCard.setAttribute("class", "fav-card");

    const title = document.createElement("p");
    title.textContent = movie.Title;
    favCard.appendChild(title);

    a.appendChild(favCard);
    favContainer.appendChild(a);
  });

  favSection.textContent = "";
  favSection.appendChild(favHeading);
  favSection.appendChild(favContainer);
  return;
}

function init() {
  const storedArrayString = localStorage.getItem("Favourites");
  FavourateMovies = JSON.parse(storedArrayString) || [];
  renderFav();
  addLatestMovie();
}

window.onload = init;

function addToFav(movie, isFavourite) {
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
  addLatestMovie();
 
}
