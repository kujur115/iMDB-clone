const movieDetail = document.getElementById("movie-detail-container");

// Gets the value associated with the key
const id = getParam("ref");

function getParam(key) {
  let address = window.location.search;
  // console.log(address);

  let parameterList = new URLSearchParams(address);
  return parameterList.get(key);
}

getMovieDetails(id);
async function getMovieDetails(imdbID) {
  const url = `http://www.omdbapi.com/?apikey=dd8897cf&i=${imdbID}&plot=full`;

  const response = await fetch(url);

  const data = await response.json();

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
                <p>${data.Genre}</p>
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
        <div class="ratings">
        <h5>Ratings</h5>
        <div class="rating-container">
       
        </div>
      </div>
    `;
  // add the ratings
  const rating = document.getElementsByClassName("rating-container")[0];
  for (let i = 0; i < data.Ratings.length; i++) {
    let r = document.createElement("div");
    r.setAttribute("class", "rating-movies");
    r.innerHTML = `
      <h6>${data.Ratings[i].Source}</h6>
      <p>${data.Ratings[i].Value}</p>
      `;
    rating.appendChild(r);
  }
}
