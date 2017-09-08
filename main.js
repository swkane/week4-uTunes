// Declaration of all of the html elements I will need to manipulate
let results = document.querySelector('.results');
let searchButton = document.querySelector("button");
let searchBox = document.querySelector('.search-input');
let audio = document.querySelector('audio');
let nowPlaying = document.querySelector('.now-playing');
let instructions = document.querySelector('.instructions');

let base = "https://itunes.apple.com/search?media=music&term=";

// When someone presses "Enter" key from the search bar it executes
searchButton.addEventListener("click", submitRequest);
searchBox.addEventListener("keypress", function(e){
  if (e.keyCode === 13) {
    submitRequest();
  }
});

// Function that pulls specific songs from iTunes API
function submitRequest() {
  let query = searchBox.value;
  console.log(`This was your query: ${query}`);
  let url = `${base}${query}`;
  console.log(`This was your ${url}`);
  instructions.innerHTML = `(Please Click a Song Below to Play It)`;
  fetch(url).then(function (response) {
    response.json().then(getSongInfo)
  });

// Appends retrieved data in a readable way
  function getSongInfo(data) {
    results.innerHTML = "";
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
        nowPlaying.innerHTML = `${artist} - ${track}`;
        instructions.innerHTML = ``;
      }
      results.appendChild(div);
    }
  }
}
