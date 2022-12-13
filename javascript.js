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
    fetch(`http://www.omdbapi.com/?s=${searchInput.value}&apikey=c92898b8`)
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
        const res = await fetch(`http://www.omdbapi.com/?i=${movieArray[i].imdbID}&apikey=c92898b8`);
        data = await res.json();
        detailedMovieArray.push(data);
    }   
    renderHTML(detailedMovieArray); 
}

//prints detailed movie information about each movie
function renderHTML(detailedMovieArray) {
    for (let i = 0; i < detailedMovieArray.length; i++) {
        searchResultsContainer.innerHTML += `
            <div class="movie-container" id="${detailedMovieArray[i].Title}-container">
                <img src="${detailedMovieArray[i].Poster}" class="movie-poster">
                <div class="movie-details-container">
                    <div class="movie-title-container">
                        <h2 class="movie-title">${detailedMovieArray[i].Title}<img src="images/imdb-star.png" class="star-icon"><span class="imdb-rating">${detailedMovieArray[i].Ratings[0].Value}</span></h2>
                    </div>
                    <div class="movie-info-container">
                        <p class="run-time"><span class="number-of-minutes">${detailedMovieArray[i].Runtime}</span></p>
                        <p class="genres">${detailedMovieArray[i].Genre}</p>
                        <button class="add-to-watchlist-btn" data-imdb="${detailedMovieArray[i].imdbID}" id="add-to-watchlist-btn-${detailedMovieArray[i].imdbID}"><img src="images/plus-button.png" class="plus-icon" id="watchlist-btn-image-${detailedMovieArray[i].imdbID}" data-imdb="${detailedMovieArray[i].imdbID}">Watchlist</button>
                    </div>
                    <p class="movie-synopsis">${detailedMovieArray[i].Plot}</p>
                </div>
            </div>
        `
    }
    chooseWatchlistMovies(detailedMovieArray);
}


//adds/deletes chosen movies to watchlist and local storage
function chooseWatchlistMovies(detailedMovieArray) {
    searchResultsContainer.addEventListener("click", function(e) { 
        if (e.target.dataset.imdb) {
            let currentMovie = e.target.dataset.imdb
            watchListKeys = Object.keys(localStorage);
            if (watchListKeys.indexOf(currentMovie) === -1) {
                for (let movie of detailedMovieArray) {
                    if (movie.imdbID === currentMovie) {
                        localStorage.setItem(`${currentMovie}`, JSON.stringify(movie));
                        document.getElementById(`watchlist-btn-image-${currentMovie}`).disabled;
                        document.getElementById(`add-to-watchlist-btn-${currentMovie}`).disabled;
                        document.getElementById(`add-to-watchlist-btn-${currentMovie}`).classList.toggle("grayed-out");
                        document.getElementById(`watchlist-btn-image-${currentMovie}`).classList.toggle("grayed-out");        
                    }
                }       
             } else if (watchListKeys.indexOf(currentMovie) >= 0 ) {
                for (let movie of detailedMovieArray) {
                    if (movie.imdbID === currentMovie) {
                        localStorage.removeItem(`${currentMovie}`);
                        document.getElementById(`add-to-watchlist-btn-${currentMovie}`).classList.toggle("grayed-out");
                        document.getElementById(`watchlist-btn-image-${currentMovie}`).classList.toggle("grayed-out");
                        document.getElementById(`watchlist-btn-image-${currentMovie}`).disabled === false;
                        document.getElementById(`add-to-watchlist-btn-${currentMovie}`).disabled === false;    
                    }
                }  
            
            }
        }  
    });
    return watchListKeys;
}

//display empty watchList message
const displayEmptyWatchListMessage = () => {
        console.log("empty")
            searchResultsContainer.innerHTML = `
                <p class="no-watchlist">No watchlist yet. 
                    <br> 
                    <br> Use the box above to search for movies, then click the <img src="images/plus-button.png" class="plus-icon-watchlist"> Watchlist button to add them to your watchlist.
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

//prints My Watchlist and removies watchlist items 
function renderWatchListHTML(detailedMovieArray) {
    for (let i = 0; i < detailedMovieArray.length; i++) {
        searchResultsContainer.innerHTML += `
            <div class="movie-container" id="${detailedMovieArray[i].Title}-container">
                <img src="${detailedMovieArray[i].Poster}" class="movie-poster">
                <div class="movie-details-container">
                    <div class="movie-title-container">
                        <h2 class="movie-title">${detailedMovieArray[i].Title}<img src="images/imdb-star.png" class="star-icon"><span class="imdb-rating">${detailedMovieArray[i].Ratings[0].Value}</span></h2>
                    </div>
                    <div class="movie-info-container">
                        <p class="run-time"><span class="number-of-minutes">${detailedMovieArray[i].Runtime}</span></p>
                        <p class="genres">${detailedMovieArray[i].Genre}</p>
                        <button class="add-to-watchlist-btn disabled" data-imdb="${detailedMovieArray[i].imdbID}" id="add-to-watchlist-btn-${detailedMovieArray[i].imdbID}"><i class="fa-solid fa-circle-minus"></i> Remove from Watchlist</button>
                    </div>
                    <p class="movie-synopsis">${detailedMovieArray[i].Plot}</p>
                </div>
            </div>
        `
    }
    searchResultsContainer.addEventListener("click", function(e){
        if (e.target.dataset.imdb) {
            console.log(e.target.dataset.imdb);
            localStorage.removeItem(`${e.target.dataset.imdb}`);
            getWatchList();

        }
    });
    
}