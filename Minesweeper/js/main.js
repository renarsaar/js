// Ui vars
const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const difficultyEl = document.getElementById("difficulty");
const minesLeft = document.getElementById("mines-left");
const time = document.getElementById("game-time");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let ctxWidth = 552;
let ctxHeight = 460;

let mines = 99;

let fieldRowCount = 24;
let fieldColCount = 20;

// Field Properties
let fieldInfo = {
  w: 23,
  h: 23,
};

let fields = [];

// Create fields
function createFields() {
  for (let i = 0; i < fieldRowCount; i++) {
    fields[i] = [];

    for (let j = 0; j < fieldColCount; j++) {
      const x = i * fieldInfo.w;
      const y = j * fieldInfo.h;

      let highlight = false;
      if (i % 2 === 0 && j % 2 === 0) {
        highlight = true;
      } else if (i % 2 === 1 && j % 2 === 1) {
        highlight = true;
      }

      fields[i][j] = { x, y, highlight, ...fieldInfo };
    }
  }
}

// Field canvas
function drawField() {
  fields.forEach((column) => {
    column.forEach((field) => {
      ctx.beginPath();
      ctx.rect(field.x, field.y, field.w, field.h);
      ctx.fillStyle = field.highlight ? "#a2d149" : "#aad751";
      ctx.stroke;
      ctx.fill();
      ctx.closePath();
    });
  });
}

// Mines
function trackMines() {
  minesLeft.innerText = `${mines}`;
}

// Function to call canvas
function draw() {
  createFields();
  drawField();
  trackMines();
}

// Init()
draw();

// Difficulty change event
difficultyEl.addEventListener("change", (e) => {
  const difficulty = e.target.value;
  // Reset game
  if (difficulty === "easy") {
    // Clear current fields
    ctx.clearRect(0, 0, 552, 460);

    // Field new sizes
    fieldInfo.w = 55.2;
    fieldInfo.h = 57.5;

    mines = 10;

    fieldRowCount = 10;
    fieldColCount = 8;

    // Clear fields array from last fields
    fields = [];

    // Init
    draw();
  } else if (difficulty === "medium") {
    // Clear current fields
    ctx.clearRect(0, 0, 552, 460);

    // Field new sizes
    fieldInfo.w = 30.7;
    fieldInfo.h = 32.9;

    mines = 40;

    fieldRowCount = 18;
    fieldColCount = 14;

    // Clear fields array from last fields
    fields = [];

    // Init
    draw();
  } else {
    // Hard
    // Clear current fields
    ctx.clearRect(0, 0, 552, 460);

    // Field new sizes
    fieldInfo.w = 23;
    fieldInfo.h = 23;

    mines = 99;

    fieldRowCount = 24;
    fieldColCount = 20;

    // Clear fields array from last fields
    fields = [];

    // Init
    draw();
  }
});

// Rules & Close rules
rulesBtn.addEventListener("click", () => rules.classList.add("show"));

closeBtn.addEventListener("click", () => rules.classList.remove("show"));