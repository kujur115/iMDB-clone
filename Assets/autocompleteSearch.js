// const search = document.getElementById("search");
// const searchBox = document.getElementById("searchBox");
// search.addEventListener("keyup", getMovie);
// async function getMovie() {
//   const movie = search.value;
//   const url = `http://www.omdbapi.com/?apikey=dd8897cf&s=${movie}`;

//   while (document.getElementsByClassName("autocomplete")[0]) {
//     document.getElementsByClassName("autocomplete")[0].remove();
//   }

//   const response = await fetch(url);

//   const data = await response.json();
//   if (data.Response == "True") {
//     addToAutocomplete(data.Search);
//   }
// }

// function addToAutocomplete(results) {
//   let autoComplete = document.createElement("div");
//   autoComplete.setAttribute("class", "autocomplete");

//   autoComplete.innerHTML = ` <hr />
//     <ul class="autocomplete-list">
//     </ul>
//     `;
//   searchBox.appendChild(autoComplete);
//   let list = document.getElementsByClassName("autocomplete-list")[0];

//   for (let i = 0; i < results.length; i++) {
//     let li = document.createElement("li");
//     li.setAttribute("data-imdbId", `${results[i].imdbID}`);
//     li.setAttribute("class", "movieList");
//     li.innerHTML = `<a href="./movie.html?ref=${results[i].imdbID}">
//     <img
//           class="list-poster"
//           src='${results[i].Poster}'
//           alt="${results[i].Title}"
//         />
//       <p>
//           <span class="list-title">${results[i].Title}</span>
//           <span class="list-year">${results[i].Year}</span>
//         </p>

//         </a>
//         <button >+ favourites</button>
//         `;
//     list.appendChild(li);
//   }
// }

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
    favButton.textContent = "Favourite";
    favButton.addEventListener("click", function () {
      addToFav(results[i]);
    });
    li.appendChild(favButton);
    list.appendChild(li);
  }
}
