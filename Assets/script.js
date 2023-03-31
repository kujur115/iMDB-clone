const search=document.getElementById('search');

search.addEventListener('keyup', getMovie);

async function getMovie(){
    const movie=search.value;
    const url=`http://www.omdbapi.com/?apikey=dd8897cf&s=${movie}&plot=full`;

    const response= await fetch(url);

    const data = await response.json();
    console.log(data);

}
// getMovie();