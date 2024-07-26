const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
let playerPaddleY = (canvas.height - paddleHeight) / 2;
let aiPaddleY = (canvas.height - paddleHeight) / 2;

const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballDX = 2;
let ballDY = 2;

let upPressed = false;
let downPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
  if(e.key == 'Up' || e.key == 'ArrowUp') {
    upPressed = true;
  } else if(e.key == 'Down' || e.key == 'ArrowDown') {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.key == 'Up' || e.key == 'ArrowUp') {
    upPressed = false;
  } else if(e.key == 'Down' || e.key == 'ArrowDown') {
    downPressed = false;
  }
}

function drawPaddle(x, y) {
  ctx.beginPath();
  ctx.rect(x, y, paddleWidth, paddleHeight);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.closePath();
}

function movePaddles() {
  if(upPressed && playerPaddleY > 0) {
    playerPaddleY -= 7;
  } else if(downPressed && playerPaddleY < canvas.height - paddleHeight) {
    playerPaddleY += 7;
  }

  if(ballY < aiPaddleY + paddleHeight / 2) {
    aiPaddleY -= 3;
  } else if(ballY > aiPaddleY + paddleHeight / 2) {
    aiPaddleY += 3;
  }
}

function moveBall() {
  ballX += ballDX;
  ballY += ballDY;

  if(ballY + ballDY > canvas.height - ballRadius || ballY + ballDY < ballRadius) {
    ballDY = -ballDY;
  }

  if(ballX + ballDX < paddleWidth && ballY > playerPaddleY && ballY < playerPaddleY + paddleHeight) {
    ballDX = -ballDX;
  } else if(ballX + ballDX > canvas.width - paddleWidth && ballY > aiPaddleY && ballY < aiPaddleY + paddleHeight) {
    ballDX = -ballDX;
  }

  if(ballX + ballDX < ballRadius || ballX + ballDX > canvas.width - ballRadius) {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballDX = -ballDX;
    ballDY = 2;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle(0, playerPaddleY);
  drawPaddle(canvas.width - paddleWidth, aiPaddleY);
  drawBall();
  movePaddles();
  moveBall();
  requestAnimationFrame(draw);
}

draw();
