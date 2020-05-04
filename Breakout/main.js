// Ui vars
const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;

// Ball properties
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 13,
  speed: 6,
  dx: 6,
  dy: -6,
};

// Paddle Properties
const paddle = {
  x: canvas.width / 2 - 80,
  y: canvas.height - 20,
  w: 160,
  h: 15,
  speed: 10,
  dx: 0,
};

// Ball canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#ff471a";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#ff471a";
  ctx.fill();
  ctx.closePath();
}

// Function to call canvas
function draw() {
  drawBall();
  drawPaddle();
  drawScore();
}

// Score
function drawScore() {
  ctx.font = "14px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 70, 30);
}

// Init()
draw();

// Rules & Close rules
rulesBtn.addEventListener("click", () => rules.classList.add("show"));

closeBtn.addEventListener("click", () => rules.classList.remove("show"));
