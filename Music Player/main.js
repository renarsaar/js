// UI Vars
const musicContainer = document.getElementById("music-container"),
  prevBtn = document.getElementById("prev"),
  playBtn = document.getElementById("play"),
  nextBtn = document.getElementById("next"),
  audio = document.getElementById("audio"),
  progressContainer = document.getElementById("progress-container"),
  progress = document.getElementById("progress"),
  title = document.getElementById("title"),
  cover = document.getElementById("cover");

// Song titles
const songs = ["Hells Bells", "Natural", "Under Your Scars"];

// Keep track of song
let songIndex = 0;

// Load the song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `img/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");

  audio.pause();
}

// Next Song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Prev Song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  // console.log(duration, currentTime, progressPercent);

  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  // Width of the clicked element
  const width = this.clientWidth;
  // console.log(width);

  // Position of the click on progress bar
  const clickX = e.offsetX;
  // console.log(clickX);

  // Get the duration
  const duration = audio.duration;

  //
  audio.currentTime = (clickX / width) * duration;
}

// Play song event
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song event
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update event
audio.addEventListener("timeupdate", updateProgress);

// CLick on progress bar
progressContainer.addEventListener("click", setProgress);

// Song ends
audio.addEventListener("ended", nextSong);
