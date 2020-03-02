/**
 * GAME FUNCTION:
 * Player must guess a number between a min and max
 * Player gets a certain amount of guesses
 * Notify player of guesses remaining
 * Notify the player of the correct answer if loose
 * Let player choose to play again
 */

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elements
const game = document.getElementById("game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.getElementById("guess-btn"),
  guessInput = document.getElementById("guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max values
minNum.textContent = min;
maxNum.textContent = max;

// Event listener for play-again
// "click" automatically reloads the page
game.addEventListener("mousedown", function(e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Event listener for guessBtn
guessBtn.addEventListener("click", function() {
  // String to int
  let guess = parseInt(guessInput.value);

  // Validate input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  if (guess === winningNum) {
    // Game won
    gameOver(true, `${guess} is the correct answer!`);
  } else {
    // Wrong number
    guessesLeft--;

    if (guessesLeft === 0) {
      // Game over
      gameOver(
        false,
        `Game over. The correct number was ${winningNum}.`,
        "red"
      );
    } else {
      // Game continues - answer wrong
      // Notify user
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");

      // Change border color
      guessInput.style.borderColor = "red";

      // Clear Input
      guessInput.value = "";
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  // Disable input
  guessInput.disabled = true;

  // Change border color
  guessInput.style.borderColor = color;

  // Change message color
  message.style.color = color;

  // Set message
  setMessage(msg);

  // Play again
  guessBtn.value = "Play Again";
  // New class that eventlistener uses
  guessBtn.className += "play-again";
  // Need to use event delegation bc it was added
}

// Set Message
function setMessage(msg, color) {
  // guessInput.style.border = "1px solid red";
  message.style.color = color;
  message.textContent = msg;
}

// Get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
