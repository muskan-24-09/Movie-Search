let apikey = `3a50c3e3`;
let movieName = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
let debounceTimeout;

searchBtn.addEventListener("click", function () {
    result.innerHTML = `<h1 class="msg">Searching..</h1>`;
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        if (movieName.value.trim().length <= 0) {
            result.innerHTML = `<h1 class="msg">Please search for something..</h1>`;
        } else {
            searchMovie(movieName.value.trim());
        }
    }, 800); // Applied Debouncing
});


async function searchMovie(query) {
    movieName.value = "";
    let response = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&s=${query}`);
    let data = await response.json();
    displayMovies(data);
}

function displayMovies(data) {
    if (data.Response == "True") {
        result.innerHTML = data.Search.map((movie, index) => `
            <div class="info">
                <img src="${movie.Poster}" alt="${movie.Title}">
                <div class="details">
                    <h2>${movie.Title} (${movie.Year})</h2>
                    <p class="type">${movie.Type}</p>
                    <button class="details-btn" onclick="viewDetails('${movie.imdbID}', ${index})">Show Details</button>
                    <div id="details-${index}" class="extra-details"></div>
                </div>
            </div>
        `).join('');
    } else {
        result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
    }
    // document.querySelector('.details-btn').addEventListener("click", () => youtubrApiCall());
}

// async function youtubrApiCall(){
//     let res = await fetch('https://www.googleapis.com/youtube/v3/${search}')
// }

async function viewDetails(imdbID, index) {
    let response = await fetch(`http://www.omdbapi.com/?apikey=${apikey}&i=${imdbID}`);
    let data = await response.json();

    let detailsDiv = document.getElementById(`details-${index}`);
    detailsDiv.innerHTML = `
        <p><strong>Director:</strong> ${data.Director}</p>
        <p><strong>Actors:</strong> ${data.Actors}</p>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Language:</strong> ${data.Language}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
        <p><strong>Votes:</strong> ${data.imdbVotes}</p>
    `;

    let btn = document.querySelectorAll(".details-btn")[index];
    btn.style.display = "none";  // Hide the "View All Details" button after clicking
}