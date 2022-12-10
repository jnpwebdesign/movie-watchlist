//  apikey=c92898b8

const form = document.getElementById("search-movies-form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchResultsContainer = document.querySelector("main");
let watchListArray = [];

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

    for (let i = 0; i < movieArray.length; i++) {
        const res = await fetch(`http://www.omdbapi.com/?i=${movieArray[i].imdbID}&apikey=c92898b8`)
        data = await res.json()
        console.log(data);
        renderHTML(data);
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
                            <button class="add-to-watchlist-btn" id="add-to-watchlist-btn" data-add="${movieArray[i].imdbID}"><img src="images/plus-button.png" class="plus-icon" data-add${i}="${movieArray[i].imdbID}">Watchlist</button>
                        </div>
                        <p class="movie-synopsis">${data.Plot}</p>
                    </div>
                </div>
                `
    };    

    document.addEventListener("click", function(e) {
        
        if(e.target.dataset.add0) {
            console.log("click");
            watchListArray.push(movieArray[0].imdbID)
            console.log(watchListArray);
        } else if (e.target.dataset.add1) {
            console.log("click");
            watchListArray.push(movieArray[1].imdbID)
            console.log(watchListArray);
        } else if (e.target.dataset.add2) {
            console.log("click");
            watchListArray.push(movieArray[2].imdbID)
            console.log(watchListArray);
        } else if (e.target.dataset.add3) {
            console.log("click");
            watchListArray.push(movieArray[3].imdbID)
            console.log(watchListArray);
        } else if (e.target.dataset.add4) {
            console.log("click");
            watchListArray.push(movieArray[4].imdbID)
            console.log(watchListArray);
        } else if (e.target.dataset.add5) {
            console.log("click");
            watchListArray.push(movieArray[5].imdbID)
            console.log(watchListArray);
        } else if (e.target.dataset.add6) {
            console.log("click");
            watchListArray.push(movieArray[6].imdbID)
            console.log(watchListArray);   
        }else if (e.target.dataset.add7) {
            console.log("click");
            watchListArray.push(movieArray[7].imdbID)
            console.log(watchListArray);
        } else if (e.target.dataset.add8) {
            console.log("click");
            watchListArray.push(movieArray[8].imdbID)
            console.log(watchListArray);
        } else if (e.target.dataset.add9) {
            console.log("click");
            watchListArray.push(movieArray[9].imdbID)
            console.log(watchListArray);
        }
    });
}
