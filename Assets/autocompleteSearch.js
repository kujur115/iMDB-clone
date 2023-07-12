
const search = document.getElementById("search");
const searchBox = document.getElementById("searchBox");
search.addEventListener("keyup", getMovie);

async function getMovie() {
  const movie = search.value;
  const url = `https://www.omdbapi.com/?apikey=dd8897cf&s=${movie}`;

  while (document.getElementsByClassName("autocomplete")[0]) {
    document.getElementsByClassName("autocomplete")[0].remove();
  }

  const response = await fetch(url);
  const data = await response.json();

  if (data.Response == "True") {
    addToAutocomplete(data.Search);
  }
}
function addToFavfromSearch(data) {
  const storedArrayString = localStorage.getItem("Favourites");
  FavourateMovies = JSON.parse(storedArrayString) || [];
  let isFavourite = FavourateMovies.some((mov) => mov.imdbID === data.imdbID);
  if (isFavourite) {
    FavourateMovies = FavourateMovies.filter(
      (mov) => mov.imdbID !== data.imdbID
    );
  } else {
    FavourateMovies.unshift(data);
  }

  const arrayString = JSON.stringify(FavourateMovies);
  localStorage.setItem("Favourites", arrayString);
  renderFav();
  addLatestMovie();
}

function addToAutocomplete(results) {
  let autoComplete = document.createElement("div");
  autoComplete.setAttribute("class", "autocomplete");

  autoComplete.innerHTML = `<hr />
    <ul class="autocomplete-list">
    </ul>`;

  searchBox.appendChild(autoComplete);

  let list = document.getElementsByClassName("autocomplete-list")[0];

  for (let i = 0; i < results.length; i++) {
    let li = document.createElement("li");
    li.setAttribute("data-imdbId", `${results[i].imdbID}`);
    li.setAttribute("class", "movieList");
    li.innerHTML = `<a href="./movie.html?ref=${results[i].imdbID}">
    <img
      class="list-poster"
      src='${results[i].Poster}'
      alt="${results[i].Title}"
    />
    <p>
      <span class="list-title">${results[i].Title}</span>
      <span class="list-year">${results[i].Year}</span>
    </p>
  </a>
  `;
    let favButton = document.createElement("button");
    let isFavourite = FavourateMovies.some(
      (mov) => mov.imdbID === results[i].imdbID
    );
    favButton.textContent = isFavourite ? "remove" : "Favourate";
    function toggleFav(data) {
      addToFavfromSearch(data);
      isFavourite = FavourateMovies.some((mov) => mov.imdbID === data.imdbID);
      favButton.textContent = isFavourite ? "Remove from Fav" : "Add To Fav";
      while (document.getElementsByClassName("autocomplete")[0]) {
        document.getElementsByClassName("autocomplete")[0].remove();
      }
      search.value = "";
    }
    favButton.addEventListener("click", function () {
      toggleFav(results[i]);
    });
    li.appendChild(favButton);
    list.appendChild(li);
  }
}
// ------------------
