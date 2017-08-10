let results = document.querySelector('.results');
let searchButton = document.querySelector("button");
let searchBox = document.querySelector('.search-input');


let base = "https://itunes.apple.com/search?term=";


searchButton.addEventListener("click", submitRequest);
searchBox.addEventListener("keypress", function(e){
  if (e.keyCode === 13) {
    submitRequest();
  }
});

function submitRequest() {
  let query = searchBox.value;
  console.log(`This was your query: ${query}`);
  let url = `${base}${query}`;
  console.log(`This was your ${url}`);
  fetch(url).then(function (response) {
    response.json().then(getSongInfo)
  });

  function getSongInfo(data) {
    console.log(`Here is the data: `,data);
    for (var i = 0; i < 25; i++) {
      let div = document.createElement('div');
      div.setAttribute("class", "result");
      div.innerHTML = `
        <img src=${data.results[i].artworkUrl100} alt="album cover">
        <p class="song-title">${data.results[i].trackName}</p>
        <p class="artist-name">${data.results[i].artistName}</p>
      `;
      results.appendChild(div);
    }
  }
}

// grab the search param from .search-input

// convert the typed text to encoded url

//execute fetch with baseURL + translated param

//append results in .results with a template literal

// Single Param Example
// https://itunes.apple.com/search?term=jack+johnson

// Double Param Example
// https://itunes.apple.com/search?term=jack+johnson&limit=25

// Key value pairs are separated with an &
// Spaces are separated with +
