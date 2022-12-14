//  apikey=c92898b8

const form = document.getElementById("search-movies-form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchResultsContainer = document.querySelector("main");
let watchListKeys = [];


//search button searches API for the input from user, returns array of objects with minimal properties for each movie
form.addEventListener("submit", function(e) {
    e.preventDefault();
    searchResultsContainer.innerHTML = "";
    fetch(`https://www.omdbapi.com/?s=${searchInput.value}&apikey=c92898b8`)
        .then(response => response.json())
        .then(data => {
            getDetailedMovieData(data.Search);
        });
});

//takes the array from Event Listener above and loops through to fetch additional information about each movie. 
async function getDetailedMovieData(movieArray) {
    let data = "";
    let detailedMovieArray = [];
    for (let i = 0; i < movieArray.length; i++) {
        const res = await fetch(`https://www.omdbapi.com/?i=${movieArray[i].imdbID}&apikey=c92898b8`);
        data = await res.json();
        detailedMovieArray.push(data);
    } 
    renderHTML(detailedMovieArray); 
}

//prints detailed movie information about each movie
function renderHTML(detailedMovieArray) {

    watchListKeys = Object.keys(localStorage);
    for (let i = 0; i < detailedMovieArray.length; i++) {
        searchResultsContainer.innerHTML += `
        <div class="movie-container" id="${detailedMovieArray[i].Title}-container">
            <img src="${detailedMovieArray[i].Poster}" class="movie-poster">
            <div class="movie-details-container">
                <div class="movie-title-container">
                    <h2 class="movie-title">${detailedMovieArray[i].Title}<img src="images/imdb-star.png" class="star-icon"><span class="imdb-rating">${detailedMovieArray[i].Ratings.length === 0 ? 'No Rating' : detailedMovieArray[i].Ratings[0].Value}</span></h2>
                </div>
                <div class="movie-info-container">
                    <p class="run-time"><span class="number-of-minutes">${detailedMovieArray[i].Runtime}</span></p>
                    <p class="genres">${detailedMovieArray[i].Genre}</p>
                    <button class="add-to-watchlist-btn ${watchListKeys.includes(detailedMovieArray[i].imdbID) ? 'grayed-out' : ''}" data-imdb="${detailedMovieArray[i].imdbID}" id="add-to-watchlist-btn-${detailedMovieArray[i].imdbID}">
                        <i class="fa-solid fa-circle-plus"></i>
                        Watchlist
                    </button>
                </div>
                <p class="movie-synopsis">${detailedMovieArray[i].Plot}</p>
            </div>
        </div>
    ` 
    }
    chooseWatchlistMovies(detailedMovieArray);
}

//adds/deletes chosen movies from search results to watchlist and local storage
function chooseWatchlistMovies(detailedMovieArray) {
    watchListKeys = Object.keys(localStorage);
    searchResultsContainer.addEventListener("click", function(e) { 
        if (e.target.dataset.imdb) {                                      //if user clicks +watchlist button
            if (watchListKeys.indexOf(e.target.dataset.imdb) === -1) {          //check if movie is in local storage. If not
                for (let movie of detailedMovieArray) {                         // loop through movies
                    if (movie.imdbID === e.target.dataset.imdb) {               
                        localStorage.setItem(`${e.target.dataset.imdb}`, JSON.stringify(movie)); //add movie to local storage
                        document.getElementById(`add-to-watchlist-btn-${e.target.dataset.imdb}`).classList.add("grayed-out");
                    };    
                } 
            } else if (watchListKeys.indexOf(e.target.dataset.imdb) >= 0 ) {//if movie already exists in local storage
                for (let movie of detailedMovieArray) {
                    if (movie.imdbID === e.target.dataset.imdb) {
                        localStorage.removeItem(`${e.target.dataset.imdb}`);
                        document.getElementById(`add-to-watchlist-btn-${e.target.dataset.imdb}`).classList.remove("grayed-out");
                    }
                }     
            }
        }  
    });
    return watchListKeys;
}

//display empty watchList message
const displayEmptyWatchListMessage = () => {
            searchResultsContainer.innerHTML = `
                <p class="no-watchlist">No watchlist yet. 
                    <br> 
                    <br> Use the box above to search for movies, then click the <i class="fa-solid fa-circle-plus"></i> Watchlist button to add them to your watchlist.
                </p>
            `
}

//message if user clicks on "My Watchlist" and it's empty
document.getElementById("view-my-watchlist-btn").addEventListener("click", function(e){
    if (localStorage.length === 0){
        displayEmptyWatchListMessage();
    } else {
        getWatchList();
    }
})

//pulls watchlist movies out of local storage and sends them to be printed
function getWatchList() {
    let watchListKeysArray = Object.keys(localStorage);
    let watchListObjectArray = watchListKeysArray.map(function(key) {
        return JSON.parse(localStorage.getItem(key));
    })    
    searchResultsContainer.innerHTML = "";
    renderWatchListHTML(watchListObjectArray);
}

//prints My Watchlist
function renderWatchListHTML(watchListObjectArray) {
    for (let i = 0; i < watchListObjectArray.length; i++) {
        searchResultsContainer.innerHTML += `
            <div class="movie-container" id="${watchListObjectArray[i].Title}-container">
                <img src="${watchListObjectArray[i].Poster}" class="movie-poster">
                <div class="movie-details-container" id="watchlist-movie-details-container">
                    <div class="movie-title-container">
                        <h2 class="movie-title">${watchListObjectArray[i].Title}<img src="images/imdb-star.png" class="star-icon"><span class="imdb-rating">${watchListObjectArray[i].Ratings.length === 0 ? 'No Rating' : watchListObjectArray[i].Ratings[0].Value}</span></h2>
                    </div>
                    <div class="movie-info-container">
                        <p class="run-time"><span class="number-of-minutes">${watchListObjectArray[i].Runtime}</span></p>
                        <p class="genres">${watchListObjectArray[i].Genre}</p>
                        <button class="remove-from-watchlist-btn" data-imdbwatchlist="${watchListObjectArray[i].imdbID}" id="remove-from-watchlist-btn-${watchListObjectArray[i].imdbID}">
                            <i class="fa-solid fa-circle-minus"></i> 
                            Remove from Watchlist
                        </button>
                    </div>
                    <p class="movie-synopsis">${watchListObjectArray[i].Plot}</p>
                </div>
            </div>
        `

    }

//user clicks "remove from watchlist" and movie is removed from local storage 
    searchResultsContainer.addEventListener("click", function(e){
        watchListKeys = Object.keys(localStorage);
        if (e.target.dataset.imdbwatchlist) {
            localStorage.removeItem(`${e.target.dataset.imdbwatchlist}`);
            getWatchList();
            for (let movie of watchListKeys) {
                if (movie.imdbID === e.target.dataset.imdbwatchlist) {
                    document.getElementById("watchlist-movie-details-container").classList.add("grayed-out");
                }
            }
        }

    });   
}