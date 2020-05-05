// Ui vars
const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;

const brickRowCount = 9;
const brickColCount = 5;

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

// Brick Properties
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

const bricks = [];

// Create bricks
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;

    bricks[i][j] = { x, y, ...brickInfo };
  }
}

//
console.log(bricks);
//

// Ball canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#ff471a";
  ctx.fill();
  ctx.closePath();
}

// Paddle canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#ff471a";
  ctx.fill();
  ctx.closePath();
}

// Brick Canvas
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#ff471a" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

// Score
function drawScore() {
  ctx.font = "14px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 70, 30);
}

// Call canvas
function draw() {
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// Init()
draw();

// Rules & Close rules
rulesBtn.addEventListener("click", () => rules.classList.add("show"));

closeBtn.addEventListener("click", () => rules.classList.remove("show"));
