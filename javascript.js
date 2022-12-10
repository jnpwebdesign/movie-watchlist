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
    let detailedMovieArray = [];
    for (let i = 0; i < movieArray.length; i++) {
        const res = await fetch(`http://www.omdbapi.com/?i=${movieArray[i].imdbID}&apikey=c92898b8`);
        data = await res.json();
        detailedMovieArray.push(data);
    }   
    renderHTML(detailedMovieArray); 
}

function renderHTML(detailedMovieArray) {
    for (let i = 0; i < detailedMovieArray.length; i++) {
        searchResultsContainer.innerHTML += `
            <div class="movie-container" id="movie-container">
                <img src="${detailedMovieArray[i].Poster}" class="movie-poster">
                <div class="movie-details-container">
                    <div class="movie-title-container">
                        <h2 class="movie-title">${detailedMovieArray[i].Title}<img src="images/imdb-star.png" class="star-icon"><span class="imdb-rating">${detailedMovieArray[i].Ratings[0].Value}</span></h2>
                    </div>
                    <div class="movie-info-container">
                        <p class="run-time"><span class="number-of-minutes">${detailedMovieArray[i].Runtime}</span></p>
                        <p class="genres">${detailedMovieArray[i].Genre}</p>
                        <button class="add-to-watchlist-btn" data-add${i}="${detailedMovieArray[i].imdbID}" id="add-to-watchlist-btn${i}"><img src="images/plus-button.png" class="plus-icon" id="watchlist-btn-image${i}" data-add${i}="${detailedMovieArray[i].imdbID}">Watchlist</button>
                    </div>
                    <p class="movie-synopsis">${detailedMovieArray[i].Plot}</p>
                </div>
            </div>
        `
    }
    addToWatchlist(detailedMovieArray);
}

function addToWatchlist(detailedMovieArray) {
    document.addEventListener("click", function(e) {
            
        if(e.target.dataset.add0) {
            if  (document.getElementById("watchlist-btn-image0").disabled) {
                watchListArray.splice(watchListArray.indexOf(detailedMovieArray[0].imdbID, 1));
                document.getElementById("watchlist-btn-image0").disabled = false;
                document.getElementById("watchlist-btn-image0").classList.toggle("grayed-out");
                document.getElementById("add-to-watchlist-btn0").classList.toggle("grayed-out");
                console.log(watchListArray);
            } else {
                watchListArray.push(detailedMovieArray[0].imdbID);
                document.getElementById("watchlist-btn-image0").classList.toggle("grayed-out");
                document.getElementById("watchlist-btn-image0").disabled = true;
                document.getElementById("add-to-watchlist-btn0").classList.toggle("grayed-out");
                console.log(watchListArray);
            }
        } else if (e.target.dataset.add1) {
            if  (document.getElementById("watchlist-btn-image1").disabled) {
                watchListArray.splice(watchListArray.indexOf(detailedMovieArray[1].imdbID, 1));
                document.getElementById("watchlist-btn-image1").disabled = false;
                document.getElementById("watchlist-btn-image1").classList.toggle("grayed-out");
                document.getElementById("add-to-watchlist-btn1").classList.toggle("grayed-out");
                console.log(watchListArray);
            } else {
                watchListArray.push(detailedMovieArray[1].imdbID);
                document.getElementById("watchlist-btn-image1").classList.toggle("grayed-out");
                document.getElementById("watchlist-btn-image1").disabled = true;
                document.getElementById("add-to-watchlist-btn1").classList.toggle("grayed-out");
                console.log(watchListArray);
            }    
        } else if (e.target.dataset.add2) {
            if  (document.getElementById("watchlist-btn-image2").disabled) {
                watchListArray.splice(watchListArray.indexOf(detailedMovieArray[2].imdbID, 1));
                document.getElementById("watchlist-btn-image2").disabled = false;
                document.getElementById("watchlist-btn-image2").classList.toggle("grayed-out");
                document.getElementById("add-to-watchlist-btn2").classList.toggle("grayed-out");
                console.log(watchListArray);
            } else {
                watchListArray.push(detailedMovieArray[2].imdbID);
                document.getElementById("watchlist-btn-image2").classList.toggle("grayed-out");
                document.getElementById("watchlist-btn-image2").disabled = true;
                document.getElementById("add-to-watchlist-btn2").classList.toggle("grayed-out");
                console.log(watchListArray);
            }       
        } else if (e.target.dataset.add3) {
            if  (document.getElementById("watchlist-btn-image3").disabled) {
                watchListArray.splice(watchListArray.indexOf(detailedMovieArray[3].imdbID, 1));
                document.getElementById("watchlist-btn-image3").disabled = false;
                document.getElementById("watchlist-btn-image3").classList.toggle("grayed-out");
                document.getElementById("add-to-watchlist-btn3").classList.toggle("grayed-out");
                console.log(watchListArray);
            } else {
                watchListArray.push(detailedMovieArray[3].imdbID);
                document.getElementById("watchlist-btn-image3").classList.toggle("grayed-out");
                document.getElementById("watchlist-btn-image3").disabled = true;
                document.getElementById("add-to-watchlist-btn3").classList.toggle("grayed-out");
                console.log(watchListArray);
            }       
        } else if (e.target.dataset.add4) {
            if  (document.getElementById("watchlist-btn-image4").disabled) {
                watchListArray.splice(watchListArray.indexOf(detailedMovieArray[4].imdbID, 1));
                document.getElementById("watchlist-btn-image4").disabled = false;
                document.getElementById("watchlist-btn-image4").classList.toggle("grayed-out");
                document.getElementById("add-to-watchlist-btn4").classList.toggle("grayed-out");
                console.log(watchListArray);
            } else {
                watchListArray.push(detailedMovieArray[4].imdbID);
                document.getElementById("watchlist-btn-image4").classList.toggle("grayed-out");
                document.getElementById("watchlist-btn-image4").disabled = true;
                document.getElementById("add-to-watchlist-btn4").classList.toggle("grayed-out");
                console.log(watchListArray);
            }       
        } else if (e.target.dataset.add5) {
            if  (document.getElementById("watchlist-btn-image5").disabled) {
                watchListArray.splice(watchListArray.indexOf(detailedMovieArray[5].imdbID, 1));
                document.getElementById("watchlist-btn-image5").disabled = false;
                document.getElementById("watchlist-btn-image5").classList.toggle("grayed-out");
                document.getElementById("add-to-watchlist-btn5").classList.toggle("grayed-out");
                console.log(watchListArray);
            } else {
                watchListArray.push(detailedMovieArray[5].imdbID);
                document.getElementById("watchlist-btn-image5").classList.toggle("grayed-out");
                document.getElementById("watchlist-btn-image5").disabled = true;
                document.getElementById("add-to-watchlist-btn5").classList.toggle("grayed-out");
                console.log(watchListArray);
            }       
        } else if (e.target.dataset.add6) {
            if  (document.getElementById("watchlist-btn-image6").disabled) {
                watchListArray.splice(watchListArray.indexOf(detailedMovieArray[6].imdbID, 1));
                document.getElementById("watchlist-btn-image6").disabled = false;
                document.getElementById("watchlist-btn-image6").classList.toggle("grayed-out");
                document.getElementById("add-to-watchlist-btn6").classList.toggle("grayed-out");
                console.log(watchListArray);
            } else {
                watchListArray.push(detailedMovieArray[6].imdbID);
                document.getElementById("watchlist-btn-image6").classList.toggle("grayed-out");
                document.getElementById("watchlist-btn-image6").disabled = true;
                document.getElementById("add-to-watchlist-btn6").classList.toggle("grayed-out");
                console.log(watchListArray);
            }       
        } else if (e.target.dataset.add7) {
            if  (document.getElementById("watchlist-btn-image7").disabled) {
                watchListArray.splice(watchListArray.indexOf(detailedMovieArray[7].imdbID, 1));
                document.getElementById("watchlist-btn-image7").disabled = false;
                document.getElementById("watchlist-btn-image7").classList.toggle("grayed-out");
                document.getElementById("add-to-watchlist-btn7").classList.toggle("grayed-out");
                console.log(watchListArray);
            } else {
                watchListArray.push(detailedMovieArray[7].imdbID);
                document.getElementById("watchlist-btn-image7").classList.toggle("grayed-out");
                document.getElementById("watchlist-btn-image7").disabled = true;
                document.getElementById("add-to-watchlist-btn7").classList.toggle("grayed-out");
                console.log(watchListArray);
            }       
        } else if (e.target.dataset.add8) {
            if  (document.getElementById("watchlist-btn-image8").disabled) {
                watchListArray.splice(watchListArray.indexOf(detailedMovieArray[8].imdbID, 1));
                document.getElementById("watchlist-btn-image8").disabled = false;
                document.getElementById("watchlist-btn-image8").classList.toggle("grayed-out");
                document.getElementById("add-to-watchlist-btn8").classList.toggle("grayed-out");
                console.log(watchListArray);
            } else {
                watchListArray.push(detailedMovieArray[8].imdbID);
                document.getElementById("watchlist-btn-image8").classList.toggle("grayed-out");
                document.getElementById("watchlist-btn-image8").disabled = true;
                document.getElementById("add-to-watchlist-btn8").classList.toggle("grayed-out");
                console.log(watchListArray);
            }       
        } else if (e.target.dataset.add9) {
            if  (document.getElementById("watchlist-btn-image9").disabled) {
                watchListArray.splice(watchListArray.indexOf(detailedMovieArray[9].imdbID, 1));
                document.getElementById("watchlist-btn-image9").disabled = false;
                document.getElementById("watchlist-btn-image9").classList.toggle("grayed-out");
                document.getElementById("add-to-watchlist-btn9").classList.toggle("grayed-out");
                console.log(watchListArray);
            } else {
                watchListArray.push(detailedMovieArray[9].imdbID);
                document.getElementById("watchlist-btn-image9").classList.toggle("grayed-out");
                document.getElementById("watchlist-btn-image9").disabled = true;
                document.getElementById("add-to-watchlist-btn9").classList.toggle("grayed-out");
                console.log(watchListArray);
            }     
        }
    });
}

function viewWatchlist() {
    console.log(watchListArray);
}