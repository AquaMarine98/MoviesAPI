window.addEventListener('DOMContentLoaded', navigation, false);
window.addEventListener('hashchange', navigation, false);
window.onbeforeunload = () => { window.scrollTo(0, 0); };

const hash = (hashId) => location.hash.startsWith(`#${hashId}`);

function navigation() {

    if (hash('trends')) {
        showTrends();
    } else if (hash('search=')) {
        showSearch();
    } else if (hash('movie=')) {
        showMovie();
    } else if (hash('category=')) {
        showCategory();
    } else { showHome(); }

    window.scrollTo(0, 0);
}

function showHome() {
    console.log('Home!');

    GENRES.classList.remove('inactive');
    POSTER_SLIDE.classList.remove('inactive');
    PREVIEW.classList.remove('inactive');
    CATEGORY.classList.add('inactive');
    MOVIE_VIEW.classList.add('inactive');

    location.hash = 'home';

    // Container, URL, idGenre = null, queryMovie =  null
    getMovies(featuredMovie, 'trending/movie/day');
    getListMoviesGenres();
}

function showCategory() {
    console.log('Categories!')

    GENRES.classList.remove('inactive');
    POSTER_SLIDE.classList.add('inactive');
    PREVIEW.classList.add('inactive');
    CATEGORY.classList.remove('inactive');
    categoryHeader.classList.remove('inactive');
    MOVIE_VIEW.classList.add('inactive');

    categoryMovies.style.marginTop = '0px';

    const [_, category] = location.hash.split('=');
    const [id, name] = category.split('-');

    categoryName.innerText = decodeURI(name);

    // Container, URL, idGenre = null, queryMovie =  null
    getMovies(categoryMovies, `discover/movie`, id);
    getListMoviesGenres();
}

function showTrends() {
    console.log('Trend!');

    GENRES.classList.add('inactive');
    POSTER_SLIDE.classList.add('inactive');
    PREVIEW.classList.add('inactive');
    CATEGORY.classList.remove('inactive');
    categoryHeader.classList.remove('inactive');
    MOVIE_VIEW.classList.add('inactive');

    categoryName.innerText = 'Tendencias';

    getMovies(categoryMovies,'trending/movie/day');
}

function showSearch() {
    console.log('Search!')

    GENRES.classList.add('inactive');
    POSTER_SLIDE.classList.add('inactive');
    PREVIEW.classList.add('inactive');
    CATEGORY.classList.remove('inactive');
    categoryHeader.classList.add('inactive');
    MOVIE_VIEW.classList.add('inactive');

    categoryMovies.style.marginTop = '32px';

    const [_, category] = location.hash.split('=');

    // Container, URL, idGenre = null, queryMovie =  null
    getMovies(categoryMovies,'search/movie',null,decodeURI(category));
}

function showMovie() {
    console.log('Movie!')

    GENRES.classList.add('inactive');
    POSTER_SLIDE.classList.add('inactive');
    PREVIEW.classList.add('inactive');
    CATEGORY.classList.add('inactive');
    categoryHeader.classList.add('inactive');
    MOVIE_VIEW.classList.remove('inactive');

    const [_ , movieId] = location.hash.split('=');
    //console.log(movieId);
    getMovieById(movieId);
}