const API_KEY = 'api_key=2408d97ca041d49d3c3430939082247c';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);
function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
       showMovies(data.results);
    })
}


function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, release_date} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <div class="movie-col">
        <h2 class="title-movie-card">${movie.title}</h2>
        <img class="img-poster" src="${IMG_URL+poster_path}" alt="${title}">
        <h3 class="rating-star">  <span class=" ${getColor(vote_average)}"> ★ ${vote_average} /10</span></h3>
        <h3> Overview : </h3>
        <p style="letter-spacing:0.2px;" class="overview-section">${overview}</p>
        <hr>
        <h3 style="letter-spacing:1px;">Release date : ${release_date}  </h3>
        <p> <a class="more-button" href="https://www.themoviedb.org/movie/${movie.id}" target="_blank"> See more &#8594;</a> </p>
        </div>`

        main.appendChild(movieEl);
    })
}

function getColor(vote_average) {
    if (vote_average >= 8) {
        return 'green';
    }
    else if (vote_average >= 5 ) {
        return 'orange';
    }
    else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCH_URL+'&query='+searchTerm)
    }
    else {
        getMovies(API_URL);
    }
})
