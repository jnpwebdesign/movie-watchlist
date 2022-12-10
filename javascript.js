//  apikey=c92898b8

const form = document.getElementById("search-movies-form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchResultsContainer = document.querySelector("main");
let detailedMovieArray = [];

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
function getDetailedMovieData(movieArray) {

    for (let movie of movieArray) {
        fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=c92898b8`)
            .then(res => res.json())
            .then (data => {
                searchResultsContainer.innerHTML += `
                <div class="movie-container" id="movie-container">
                    <img src="${data.Poster}" class="movie-poster" height="147px" width="99px">
                    <div class="movie-details-container">
                        <div class="movie-title-container">
                            <h2 class="movie-title">${data.Title}<img src="images/imdb-star.png" class="star-icon"><span class="imdb-rating">${data.Ratings[0].Value}</span></h2>
                        </div>
                        <div class="movie-info-container">
                            <p class="run-time"><span class="number-of-minutes">${data.Runtime}</span></p>
                            <p class="genres">${data.Genre}</p>
                            <button class="add-to-watchlist-btn"><img src="images/plus-button.png" class="plus-icon">Watchlist</button>
                        </div>
                        <p class="movie-synopsis">${data.Plot}</p>
                    </div>
                </div>
                `
            })
            
    };

    
}


function renderHTML(detailedMovieArray) {
    console.log("detailed movie arr")};


