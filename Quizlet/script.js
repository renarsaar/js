// UI Vars
const clear = document.getElementById("clear");
const show = document.getElementById("show");
const cards = document.getElementById("cards-container");
const prev = document.getElementById("prev");
const current = document.getElementById("current");
const next = document.getElementById("next");
const addContainer = document.getElementById("add-container");
const hide = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCard = document.getElementById("add-card");

// Keep track of current card
let currentCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// Create all cards
function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in the DOM
function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  // Active state on first card
  if (index === 0) {
    card.classList.add("active");
  }

  // Div content
  card.innerHTML = `
  <div class="inner-card">
   <div class="inner-card-front"><p>${data.question}</p></div>
   <div class="inner-card-back"><p>${data.answer}</p></div>
  </div>
  `;

  // Flip answer eventlistener
  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  // Add to cardsEl array
  cardsEl.push(card);

  cards.appendChild(card);

  updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
  current.innerHTML = `${currentCard + 1}/${cardsEl.length}`;
}

// Get cards from LS
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

// Set cards to LS
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));

  window.location.reload();
}

createCards();

// Event listeners
// Next btn
next.addEventListener("click", () => {
  cardsEl[currentCard].className = "card left";

  currentCard = currentCard + 1;

  if (currentCard > cardsEl.length - 1) {
    currentCard = cardsEl.length - 1;
  }

  cardsEl[currentCard].className = "card active";

  updateCurrentText();
});

// Prev btn
prev.addEventListener("click", () => {
  cardsEl[currentCard].className = "card right";

  currentCard = currentCard - 1;

  if (currentCard < 0) {
    currentCard = 0;
  }

  cardsEl[currentCard].className = "card active";

  updateCurrentText();
});

// Show add container
show.addEventListener("click", () => addContainer.classList.add("show"));

// Hide add container
hide.addEventListener("click", () => addContainer.classList.remove("show"));

// Add a new Card
addCard.addEventListener("click", () => {
  const question = questionEl.value,
    answer = answerEl.value;

  if (question.trim() && answer.trim()) {
    const newCard = {
      question,
      answer,
    };

    createCard(newCard);

    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");

    cardsData.push(newCard);

    setCardsData(cardsData);
  }
});

// Clear cards button
clear.addEventListener("click", () => {
  localStorage.clear();
  cards.innerHTML = "";
  window.location.reload();
});
