// script to make api call to OMDB api for the searched word 
// suggests all the movies that matche the typed word

const search = document.getElementById("search");
const searchBox = document.getElementById("searchBox");
search.addEventListener("keyup", getMovie);

async function getMovie() {
  //  calls api with s parameter 
  const movie = search.value;
  const url = `https://www.omdbapi.com/?apikey=dd8897cf&s=${movie}`;

  // loop to remove any existing movies in autocomplete list
  while (document.getElementsByClassName("autocomplete")[0]) {
    document.getElementsByClassName("autocomplete")[0].remove();
  }

  const response = await fetch(url);
  const data = await response.json();

  //  if response is true calls the addToAutocomplete with the response data
  if (data.Response == "True") {
    addToAutocomplete(data.Search);
  }
}

function addToFavfromSearch(data) {
  //  function adds/removes movies from the autocomplete list to the favourate list
  // favourate list is stored in local storage with keyword "Favourates"

  const storedArrayString = localStorage.getItem("Favourites");
  FavourateMovies = JSON.parse(storedArrayString) || []; 
  let isFavourite = FavourateMovies.some((mov) => mov.imdbID === data.imdbID);
  if (isFavourite) {
    // removes the movie from favourate list if already exists
    FavourateMovies = FavourateMovies.filter(
      (mov) => mov.imdbID !== data.imdbID
    );
  } else {
    // add to the favourate list if doesnt exist already
    FavourateMovies.unshift(data);
  }

  // stringfy the favourate list and stores in local storage
  const arrayString = JSON.stringify(FavourateMovies);
  localStorage.setItem("Favourites", arrayString);

  // calls other functions to render the favourate buttons in the favourate section and latest movies section
  renderFav();
  addLatestMovie();
}

function addToAutocomplete(results) {
  // create the div tag with class name "autocomplete" and add the list of searched movies in it
  let autoComplete = document.createElement("div");
  autoComplete.setAttribute("class", "autocomplete");

  autoComplete.innerHTML = `<hr />
    <ul class="autocomplete-list">
    </ul>`;
  // autocomplete div is appended to search box
  searchBox.appendChild(autoComplete);

  let list = document.getElementsByClassName("autocomplete-list")[0];
  // components of autocomplete list added for each searched movies
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
    }
    favButton.addEventListener("click", function () {
      toggleFav(results[i]);
    });
    li.appendChild(favButton);
    list.appendChild(li);
  }
}

