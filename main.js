let results = document.querySelector('.results');
let searchButton = document.querySelector("button");
let searchBox = document.querySelector('.search-input');
let audio = document.querySelector('audio');
let span = document.querySelector('span');


let base = "https://itunes.apple.com/search?media=music&term=";


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
      let sample = data.results[i].previewUrl;
      let artist = data.results[i].artistName;
      let track = data.results[i].trackName;
      let div = document.createElement('div');
      div.setAttribute("class", "result");
      div.innerHTML = `
        <img src=${data.results[i].artworkUrl100} alt="album cover">
        <p class="song-title">${data.results[i].trackName}</p>
        <p class="artist-name">${data.results[i].artistName}</p>
      `;
    //  console.log(data.results[i].previewUrl);
      div.addEventListener("click", addSoundBit);
      function addSoundBit() {
        audio.setAttribute("src", sample);
        audio.play();
        span.innerHTML = `${artist} - ${track}`;
      }
      results.appendChild(div);
    }
  }
}

// Give each result an id = i

// Create an array of the .previewUrl values

// Create a click event that says, when you click a div, grab the sound byte value of the same index as the id from soundSampleArr

// TODO: Create a click event for whatever song you choose
// TODO: Change the src of the audio element to match the chosen song

// TODO: create a hover play icon on each album cover

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
