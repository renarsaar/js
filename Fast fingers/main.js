// UI Vars
const settingsBtn = document.getElementById("settings-btn"),
  settings = document.getElementById("settings"),
  settingsForm = document.getElementById("settings-form"),
  difficultySelector = document.getElementById("difficulty"),
  word = document.getElementById("word"),
  text = document.getElementById("text"),
  timeEl = document.getElementById("time"),
  scoreEl = document.getElementById("score"),
  endGameContainer = document.getElementById("end-game-container");

// Random Words
let words = [];

// Load random words from API
async function getWord() {
  const res = await fetch(
    "https://random-word-api.herokuapp.com/word?number=1"
  );
  const data = await res.json();
  return data[0];
}

// Init random word, score, time, idfficulty
let randomWord,
  score = 0,
  time = 10,
  difficulty =
    localStorage.getItem("difficulty") !== null
      ? localStorage.getItem("difficulty")
      : "medium";

// Set difficulty
difficultySelector.value = difficulty;

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Add word to DOM
async function addWordToDOM() {
  randomWord = await getWord();
  word.innerHTML = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    // End game
    gameOver();
  }
}

// Game over
function gameOver() {
  endGameContainer.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;
  endGameContainer.style.display = "flex";
}

function keyboardHighlight(e) {
  const keyPress = e.target.value;
  let randomWordLetters = randomWord.split("");

  if (
    randomWordLetters[keyPress.length - 1] ===
    keyPress.charAt(keyPress.length - 1)
  ) {
    document
      .getElementById(`${keyPress.charAt(keyPress.length - 1)}`)
      .classList.add("correct");

    setTimeout(() => {
      document
        .getElementById(`${keyPress.charAt(keyPress.length - 1)}`)
        .classList.remove("correct");
    }, 300);
  } else {
    document
      .getElementById(`${keyPress.charAt(keyPress.length - 1)}`)
      .classList.add("incorrect");

    setTimeout(() => {
      document
        .getElementById(`${keyPress.charAt(keyPress.length - 1)}`)
        .classList.remove("incorrect");
    }, 300);
  }
}

// Init
getWord();
addWordToDOM();

// Event listeners

// Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  keyboardHighlight(e);

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear
    e.target.value = "";

    difficulty === "hard"
      ? (time += 2)
      : difficulty === "medium"
      ? (time += 3)
      : (time += 5);

    updateTime();
  }
});

// Settings btn
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// Difficulty select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;

  localStorage.setItem("difficulty", difficulty);
});
