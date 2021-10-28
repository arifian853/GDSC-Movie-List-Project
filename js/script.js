const API_KEY = 'api_key=2408d97ca041d49d3c3430939082247c';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' + API_KEY;

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');

var selectedGenre = [];
setGenre();
function setGenre() {
    tagsEl.innerHTML= '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id-genre.id;
        t.innerText = genre.name; 
        t.addEventListener('click',() =>{
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
            }
            else {
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if (id == genre.id){
                            selectedGenre.splice(idx, 1);
                        }
                    })
                }
                else {
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)
            getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')))
        })
        tagsEl.append(t);
    })
}

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
        <p style="letter-spacing:0.2px;" class="overview-section">
        <p> <b> ${movie.title} </b> </p>
       
        ${overview}
        </p>
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
