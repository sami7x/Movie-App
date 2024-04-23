// Define the API URL for fetching movie data from The Movie Database (TMDb).
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=27f8119ef49fbcaca1a9f533bcd6be6c&page=1";

// Define the base URL for movie images from TMDb.
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="

const main = document.getElementById("main"); 
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(APIURL);

async function getMovies(url) {
  // Fetch movie data from the API using the defined URL.
  const resp = await fetch(url);
  
  // Extract JSON data from the response.
  const respData = await resp.json(); 
  
  showMovies(respData.results);
  
}

function showMovies(movies){
  //clear main 
  main.innerHTML= "";
  movies.forEach(movie=>{
    const { poster_path, title, vote_average} = movie;
  
      const movieE1 = document.createElement('div');
      movieE1.classList.add("movie");
  
      movieE1.innerHTML = `
      <div class="movie">
            <img src="${IMGPATH + poster_path}" alt="${title}">
          <div class="movie-info">
              <h3>${title}</h3>
              <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
        </div>
      `;
  
      main.appendChild(movieE1);
    });
}

function getClassByRate(vote)
{
  if(vote >= 8)
  {
    return "green";
  }
  else if( vote>= 5)
  {
    return 'orange';
  }
  else{
    return 'red';
  }

}

form.addEventListener('submit', (e) =>{
 e.preventDefault();

 const searchTerm = search.value;

 if(searchTerm)
 {
  getmovies(SEARCHAPI + searchTerm);
  search.value = '';
 }
});
