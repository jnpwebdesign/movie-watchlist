//  apikey=c92898b8

const form = document.getElementById("search-movies-form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchResultsContainer = document.querySelector("main");
let watchListArray = [];
let watchListArrayDetails = [];


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
    chooseWatchlistMovies();
}


//adds/deletes chosen movies to watchlist
function chooseWatchlistMovies() {

    searchResultsContainer.addEventListener("click", function(e) { 

        if (e.target.dataset.imdb) {
            let currentMovie = e.target.dataset.imdb
             if(watchListArray.indexOf(currentMovie) === -1) {
                watchListArray.push(currentMovie);
                document.getElementById(`watchlist-btn-image-${currentMovie}`).disabled;
                document.getElementById(`add-to-watchlist-btn-${currentMovie}`).disabled;
                document.getElementById(`add-to-watchlist-btn-${currentMovie}`).classList.toggle("grayed-out");
                document.getElementById(`watchlist-btn-image-${currentMovie}`).classList.toggle("grayed-out");
                console.log(watchListArray);
             } else  if (watchListArray.indexOf(currentMovie) >= 0 ) {
                document.getElementById(`add-to-watchlist-btn-${currentMovie}`).classList.toggle("grayed-out");
                document.getElementById(`watchlist-btn-image-${currentMovie}`).classList.toggle("grayed-out");
                document.getElementById(`watchlist-btn-image-${currentMovie}`).disabled === false;
                document.getElementById(`add-to-watchlist-btn-${currentMovie}`).disabled === false;
                watchListArray.splice(watchListArray.indexOf(currentMovie), 1);
                console.log(watchListArray);
             }
    
        }
    });
}






async function getWatchList(watchListArray) {
    if (watchListArray.length === 0){
        searchResultsContainer.innerHTML = `<p>No watchlist</p>`
        console.log("click");
    }
    console.log("click");
    console.log(watchListArray);
    let data = "";
    searchResultsContainer.innerHTML = "";
    let detailedMovieArray = [];
    for (let i = 0; i < watchListArray.length; i++) {
        const res = await fetch(`http://www.omdbapi.com/?i=${watchListArray[i]}&apikey=c92898b8`);
        data = await res.json();
        watchListArrayDetails.push(data);
    }   
    renderHTML(watchListArrayDetails); 
}

document.getElementById("view-my-watchlist-btn").addEventListener("click", function(watchListArray){
    console.log(watchListArray);
}); 


