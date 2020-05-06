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
  // Position
  x: canvas.width / 2,
  y: canvas.height / 2,
  // Size
  size: 13,
  // Speed
  speed: 6,
  // X and Y axis move direction
  dx: 6,
  dy: -6,
};

// Paddle Properties
const paddle = {
  x: canvas.width / 2 - 80,
  y: canvas.height - 20,
  // Size
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

// Move paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx;

  // Wall detection
  // Right side
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  // Left side
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

// Call canvas
function draw() {
  // Clear ctx
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// Update canvas drawing and animation
function update() {
  movePaddle();

  // Init()
  draw();

  requestAnimationFrame(update);
}

update();

// Key down event
function keyDown(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
}

// e.keyCode is deprecated, not rec anymore

// Key up event
function keyUp(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
}

// Keyboard event
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Rules & Close rules
rulesBtn.addEventListener("click", () => rules.classList.add("show"));

closeBtn.addEventListener("click", () => rules.classList.remove("show"));
