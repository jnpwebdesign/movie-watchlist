//  api requests: http://www.omdbapi.com/?i=tt3896198&apikey=c92898b8

const form = document.getElementById("search-movies-form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchResultsContainer = document.querySelector("main");
let detailedMovieArray = [];
console.log(detailedMovieArray, detailedMovieArray.length);

form.addEventListener("submit", function(e) {
    e.preventDefault();
    detailedMovieArray = [];
    console.log(detailedMovieArray, detailedMovieArray.length);
    fetch(`http://www.omdbapi.com/?s=${searchInput.value}&apikey=c92898b8`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            getDetailedMovieData(data.Search);
        });
});

function getDetailedMovieData(movieArray) {
    console.log(movieArray);
    for (let movie of movieArray) {
        fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=c92898b8`)
            .then(res => res.json())
            .then (data => {
                console.log(data);
            });
    };
    renderHTML(data);
}

function renderHTML(data) {
    console.log(data);
}


// searchResultsContainer.innerHTML += `
// <div class="movie-container" id="movie-container">
//     <img src="${movie.Poster}" class="movie-poster" height="147px" width="99px">
//     <div class="movie-details-container">
//         <div class="movie-title-container">
//             <h2 class="movie-title">${movie.Title}<img src="images/imdb-star.png" class="star-icon"><span class="imdb-rating">${movie.Ratings[0].Value}</span></h2>
//         </div>
//         <div class="movie-info-container">
//             <p class="run-time"><span class="number-of-minutes">${movie.Runtime}</span> min</p>
//             <p class="genres">${movie.Genre}</p>
//             <button class="add-to-watchlist-btn"><img src="images/plus-button.png" class="plus-icon">Watchlist</button>
//         </div>
//         <p class="movie-synopsis">${movie.Plot}</p>
//     </div>
// </div>
// `