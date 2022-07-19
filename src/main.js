/* import fetch from "node-fetch"; */
const MOVIE_API = '62c5802e0c7f6d5970973ec0f4c47ba9';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    params: {
        'api_key': MOVIE_API,
        'language': 'es-AR',
    },
});

// Buttons
PAGE_TITLE.onclick = () => {location.hash = 'home'; window.scrollTo(0, 0);};

searchButton.addEventListener('click', () => {
    location.hash = '#search=' + searchInput.value;
})

/* trendsMovieBtn.addEventListener('click', () => location.hash = 'trends'); */

// Functions
async function getMovies(container, URL, id = null, query = null) {
    const { data } = await api(URL, {
        params: {
            'with_genres': id,
            query,
        },
    });
    
    const movies = data.results;

    container.innerHTML = '';
    
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = 'movie=' + movie.id;
        })

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        const movieTitle = document.createElement('h3');
        movieTitle.classList.add('movie-title');
        movieTitle.textContent = movie.title;

        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(movieTitle);
        container.appendChild(movieContainer);

    });
}

async function getListMoviesGenres() {
    const { data } = await api('genre/movie/list');

    GENRES.innerHTML = "";
    const genres = data.genres;

    genres.forEach(category => {
        const categoryContainer = document.createElement('h3');

        categoryContainer.setAttribute('id', category.id);
        categoryContainer.classList.add('genre');
        categoryContainer.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`
        })

        categoryContainer.innerText = category.name;

        GENRES.appendChild(categoryContainer);

    });
}

async function getMovieById(movieId) {
    const { data: movie } = await api(`movie/${movieId}`);

    bgMovieViewImg.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

    movieViewImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    movieViewDescriptionContainer.innerHTML = "";

    const h2 = document.createElement('h2');
    h2.innerText = movie.original_title;

    const h3 = document.createElement('h3');
    h3.innerText = 'Generos: ';
    movie.genres.map((genre, index, movie) => {
        if(index+1 === movie.length) {
            h3.innerText += `${genre.name}.`
        } else {
            h3.innerText += `${genre.name}, `
        }
        
    })

    const h1 = document.createElement('h1');
    h1.innerText = movie.overview;

    const h4 = document.createElement('h4');
    h4.innerText = '⭐' + movie.vote_average + '/10';

    movieViewDescriptionContainer.appendChild(h2);
    movieViewDescriptionContainer.appendChild(h4);
    movieViewDescriptionContainer.appendChild(h3);
    movieViewDescriptionContainer.appendChild(h1);

    getRelatedMoviesById(movieId);
}

async function getRelatedMoviesById(id) {
    const { data } = await api(`movie/${id}/recommendations`);

    const movies = data.results;

    relatedMoviesContainer.innerHTML = '';
    
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = 'movie=' + movie.id;
        })

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        const movieTitle = document.createElement('h3');
        movieTitle.classList.add('movie-title');
        movieTitle.textContent = movie.title;

        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(movieTitle);
        relatedMoviesContainer.appendChild(movieContainer);

    });
}