// UI VARS
const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-again");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

// All word
const words = [
  "application",
  "programming",
  "design",
  "engineer",
  "wizard",
  "javascript",
  "server",
  "internet",
];

// Selected word
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayWord() {
  // Turn string into array
  // Map through array
  // if letter is in "correctLetter" == output the letter
  // Turn letter back into a string
  wordEl.innerHTML = `
  ${selectedWord
    .split("")
    .map(
      (letter) => `
  <span class="letter">
  ${correctLetters.includes(letter) ? letter : ""}
  </span>
    `
    )
    .join("")}
  `;

  // Replace new line char with empty string
  const innerWord = wordEl.innerText.replace(/\n/g, "");

  // Check If the word has been guessed = won
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won!";
    popup.style.display = "flex";
  }
}

// Update the wrong letter
function updateWrongLetterEl() {
  // If anything inside wrongLetters = "Wrong"
  // Output the letters that are inside wrongLetters
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span> ${letter}</span>`)}
  `;

  // Add to the figure
  figureParts.forEach((part, index) => {
    // Check how many wrong letters
    const errors = wrongLetters.length;

    if (index < errors) {
      // For each iteration add display block to one element
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if full figure = Lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Game over! You lost!";
    popup.style.display = "flex";
  }
}

// Show notification
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

// Keydown Letter press function
window.addEventListener("keydown", (e) => {
  // Key codes 65 - 90 (a-z)
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    // Pressed letter into variable
    const letter = e.key;

    // Find out if the letter is in selected word
    if (selectedWord.includes(letter)) {
      // Add the letter to correct letters (only if not already there)
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        // Update the word element to show the new letter
        displayWord();
      } else {
        // If the pressed letter is already there
        showNotification();
      }
    } else {
      // If pressed letter is not listed in selectedWord
      // Check if the letter is already not in wrongLetter array
      if (!wrongLetters.includes(letter)) {
        // Push it into wrong letter array
        wrongLetters.push(letter);

        updateWrongLetterEl();
      } else {
        showNotification();
      }
    }
  }
});

// Play again event
playAgainBtn.addEventListener("click", () => {
  // Empty the arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  // Display a new word
  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  // Clean the wrong letter / figure
  updateWrongLetterEl();

  popup.style.display = "none";
});

// Called automatically
displayWord();
