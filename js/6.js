const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a0814a81d9e0ea8e164320078c18b3cb&page=1';

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=a0814a81d9e0ea8e164320078c18b3cb&query="';

const main = document.getElementById('main');
const search = document.getElementById('search');
const form = document.getElementById('form');

getMovie(API_URL)


async function getMovie(url) {
    const res = await fetch(url);
    const data = await res.json();

    console.log(data.results)
    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClass(vote_average)}">${vote_average}</span>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `

        main.appendChild(movieEl)
    });

}

function getClass(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovie(SEARCH_API + searchTerm)
        search.value = '';
    } else {
        window.location.reload()
    }
})









