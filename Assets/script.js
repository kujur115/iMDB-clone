const search = document.getElementById("search");
const searchBox = document.getElementById("searchBox");
const movieDetail = document.getElementById("movie-detail-container");
let movieList = document.getElementsByClassName("movieList");

// const list= document.getElementsByClassName('autocomplete-list')[0];
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
    li.innerHTML = `<p>
        <span class="list-title">${results[i].Title}</span>
        <span class="list-year">${results[i].Year}</span>
      </p>

      <img
        class="list-poster"
        src='${results[i].Poster}'
        alt="${results[i].Title}"
      />`;
    list.appendChild(li);
    li.addEventListener("click", (e) => {
      var imdbID = e.target.dataset.imdbid;
      getMovieDetails(imdbID);
    });

    // let p=document.createElement('p');
    // let listTitle=document.createElement('span');
    // listTitle.setAttribute('class','list-title');
    // let listYear=document.createElement('span');
    // listYear.setAttribute('class','list-year');
    // p.appendChild(listTitle);
    // p.appendChild(listYear);
    // li.appendChild(p);

    // let img=document.createElement('img');
    // img.setAttribute('class','list-poster');
    // img.src=`${results[i]}`;
  }
}
// getMovie();

// document.addEventListener("click", (e) => {
//   console.log(e);
//   if (e.target == "li.movieList") {
//     console.log("aaaaaa");
//     let mm = e.target;
//     let imdbid = mm.dataset.imdbid;
//     console.log(imdbid);
//     getMovieDetails(imdbid);
//   } else {
//     console.log("bbbbb");
//   }
// });

async function getMovieDetails(imdbID) {
  // const movie = search.value;
  const url = `http://www.omdbapi.com/?apikey=dd8897cf&i=${imdbID}&plot=full`;

  // while (document.getElementsByClassName("autocomplete")[0]) {
  //   document.getElementsByClassName("autocomplete")[0].remove();
  // }

  const response = await fetch(url);

  const data = await response.json();
  console.log(data);
  while (document.getElementsByClassName("autocomplete")[0]) {
    document.getElementsByClassName("autocomplete")[0].remove();
  }
  // if (data.Response == "True") {
  //   addToAutocomplete(data.Search);
  // }
  addToDetails(data);
}
function addToDetails(data) {
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
          <div class="movie-title"><p>${data.Title}</p></div>
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

        <div class="imdb-ratings">
          <div class="inner-container">
            <div class="element-container">
              <p class="r-title">iMDB RATING</p>
              <p class="r-val"><span class="text">${data.imdbRating}</span>/10</p>
            </div>
            <div class="element-container">
              <p class="r-title">YOUR RATING</p>
              <p class="r-val">Rate</p>
            </div>
            <div class="element-container">
              <p class="r-title">POPULARITY</p>
              <p class="r-val">${data.Metascore}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="poster-details-container">
        <img
          src="${data.Poster}"
          alt=""
        />

        <div class="movie">
          <div class="genre">
            <div class="element-container">
              <p>Action</p>
            </div>
            <div class="element-container">
              <p>Adventure</p>
            </div>
            <div class="element-container">
              <p>Drama</p>
            </div>
          </div>
          <div class="plot">
            <p>
              ${data.Plot}
            </p>
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
  `;
}
