// DOM manipulation example
// let title = document.querySelector("h1");
// title.onclick = changeTitle;

// function changeTitle() {
//   title.innerText = "Hi, I'm using the DOM";
// }
// =-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-

let songs = [];
let currentSong = 0;

// const colors = [
//   "red",
//   "blue",
//   "aqua",
//   "blueviolet",
//   "cyan",
//   "teal",
//   "lightcyan",
//   "DEEPSKYBLUE",
//   "AQUAMARINE",
//   "PALETURQUOISE",
//   "PALEVIOLETRED",
//   "PINK",
//   "LIGHTPINK",
// ];

const title = document.querySelector("h1");
const input = document.querySelector("input");
const label = document.querySelector("label");
const prev = document.querySelector("#prev");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const player = document.querySelector("audio");

player.volume = 0.3;

// play.onclick = pause() --> wiht parenthesis, this executes the function right away when the page loads
// play.onclick = pause --> this will execute only when the user clicks

// I'm declaring functions early, so I will have to use traditional fucntion syntax instead of fat arrows because fat arorows do not hoist.
input.onchange = getSongs;
next.onclick = nextSong;
prev.onclick = prevSong;

// Music Player Data Fetching
// --------------------------------------------------
//can't use arrow function here becuase arrow functions do not hoist. function is called above function.
function getSongs(event) {
  // event = What happened? files are uplaoded to input
  // target = What tag am I looking for? the input tag
  // files = What am I targeting? the files I input
  songs = event.target.files; // Now when I upload a song, "click here to upload songs" will show file
  // console.log(songs);
  playSong();
  label.innerText = songs[currentSong].name.slice(0, -4); //change label inner text so that the currentSong name is displayed
  title.innerText = "Spotifake Player"; // change title
}

//can't use arrow function here becuase arrow functions do not hoist. function is called above function.
function playSong() {
  // this locates the current song file to use as the audio src
  let song = URL.createObjectURL(songs[currentSong]); //get temporary URL for mp3 file
  label.innerText = songs[currentSong].name.slice(0, -4); //change songs displayed name
  // label.style.color = colors[Math.floor(Math.random() * songs.length)];
  // label.style.backgroundColor =
  //   colors[Math.floor(Math.random() * songs.length)];
  player.setAttribute("src", song); //this establishes audio "src" as the destination for song URLs
  player.play(); // this tells the audio tag to start playng the song I just sent it
  play.innerHTML = `<i class="fas fa-pause fa-4x" style="color: coral"></i>`; // changes the play button to pause when song is playing
  play.onclick = pause;
}

// Controls & Operations
// -------------------------------------------------
function pause() {
  // innerHTML allows me to use font awesome icon when the pause function is invoked.
  play.innerHTML = `<i class="fas fa-play fa-4x" style="color: CORAL;"></i>`;
  player.pause();
  play.onclick = playCurrentSong; // call function with no parenthesis
}

function playCurrentSong() {
  play.innerHTML = `<i class="fas fa-pause fa-4x" style="color: coral"></i>`;
  player.play();
  play.onclick = pause; // call function with no parenthesis
}

function nextSong() {
  // conditional statement ensures next button only works if there is a next song in the array.
  if (currentSong + 1 < songs.length) {
    currentSong = currentSong + 1; // "currentSong++" also works
    playSong();
  }
}

function prevSong() {
  // conditional statement ensures prev button only works if there is a prev song in the array.
  if (currentSong - 1 >= 0) {
    currentSong = currentSong - 1; // "currentSong--" also works
    playSong();
  }
}

// Progress Bar
// -----------------------------------------------------

// this function creates the elapsed time status bar in the progress bar
const updateProgress = () => {
  if (player.currentTime > 0) {
    const progressBar = document.getElementById("progress");
    progressBar.value = (player.currentTime / player.duration) * 100;
  }
};
