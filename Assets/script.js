const search = document.getElementById("search");
const searchBox = document.getElementById("searchBox");
const movieDetail = document.getElementById("movie-detail-container");
let movieList = document.getElementsByClassName("movieList");

search.addEventListener("keyup", getMovie);

async function getMovie() {
  const movie = search.value;
  const url = `http://www.omdbapi.com/?apikey=dd8897cf&s=${movie}`;

  while (document.getElementsByClassName("autocomplete")[0]) {
    document.getElementsByClassName("autocomplete")[0].remove();
  }

  const response = await fetch(url);

  const data = await response.json();
  // console.log(data);
  if (data.Response == "True") {
    addToAutocomplete(data.Search);
  }
}

function addToAutocomplete(results) {
  let autoComplete = document.createElement("div");
  autoComplete.setAttribute("class", "autocomplete");

  autoComplete.innerHTML = ` <hr />
  <ul class="autocomplete-list">
  </ul>
  `;
  searchBox.appendChild(autoComplete);
  let list = document.getElementsByClassName("autocomplete-list")[0];

  for (let i = 0; i < results.length; i++) {
    let li = document.createElement("li");
    li.setAttribute("data-imdbId", `${results[i].imdbID}`);
    li.setAttribute("class", "movieList");
    li.innerHTML = `<a href="./movie.html?ref=${results[i].imdbID}">
    <p>
        <span class="list-title">${results[i].Title}</span>
        <span class="list-year">${results[i].Year}</span>
      </p>

      <img
        class="list-poster"
        src='${results[i].Poster}'
        alt="${results[i].Title}"
      />
      </a>`;
    list.appendChild(li);
  }
}

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

function addLatestMovie() {
  const movieContainer = document.getElementsByClassName("card-container");
  for (let i = 0; i < movieContainer.length; i++) {
    for (let j = 0; j < latestMovies.length; j++) {
      let div = document.createElement("div");
      div.setAttribute("class", "movie-card");
      div.innerHTML = `
    <a href="./movie.html?ref=${latestMovies[j].imdbID}">
    <img
      src="${latestMovies[j].Poster}"
      alt=""
    />
  </a>
  <div class="card-ratings">
    <p>8.4</p>
  </div>
  <div class="card-title">
    <p>${latestMovies[j].Title}</p>
  </div>
  <div class="card-watchlist">
    <button onclick="addToFav('${latestMovies[j].Title}','${latestMovies[j].imdbID}',)" >Favourate</button>
  </div>
    `;
      movieContainer[i].appendChild(div);
    }
  }
}
addLatestMovie();
function renderFav() {
  const fav = document.getElementById("fav-section");
  fav.innerHTML = `<h4>Favourates</h4>
  <div class="fav-container">
  </div>`;
  const favourite = document.getElementsByClassName("fav-container")[0];
  for (let i = 0; i < localStorage.length; i++) {
    let a = document.createElement("a");
    a.href = `./movie.html?ref=${localStorage.getItem(localStorage.key(i))}`;
    a.innerHTML = `
    <div class="fav-card">
      <p>${localStorage.key(i)}</p>
    </div>`;
    favourite.appendChild(a);
  }
}
window.onload = renderFav();

function addToFav(title, imdbID) {
  if (localStorage.getItem(title) == null) {
    localStorage.setItem(title, imdbID);
    console.log("added to fav");
  } else {
    localStorage.removeItem(title);
    console.log("removed from fav");
  }
  renderFav();
}
