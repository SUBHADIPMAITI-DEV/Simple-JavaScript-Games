const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const basketWidth = 80;
const basketHeight = 20;
let basketX = (canvas.width - basketWidth) / 2;
let rightPressed = false;
let leftPressed = false;

const ballRadius = 10;
let ballX = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
let ballY = ballRadius;
let ballDY = 2;

let score = 0;
let gameOver = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
  if(e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if(e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if(e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
}

function drawBasket() {
  ctx.beginPath();
  ctx.rect(basketX, canvas.height - basketHeight, basketWidth, basketHeight);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#0095DD';
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#0095DD';
  ctx.fillText('Score: ' + score, 8, 20);
}

function detectCollision() {
  if(ballY + ballRadius > canvas.height - basketHeight &&
     ballX > basketX && ballX < basketX + basketWidth) {
    score++;
    resetBall();
  } else if(ballY + ballRadius > canvas.height) {
    gameOver = true;
  }
}

function resetBall() {
  ballX = Math.random() * (canvas.width - ballRadius * 2) + ballRadius;
  ballY = ballRadius;
}

function moveBasket() {
  if(rightPressed && basketX < canvas.width - basketWidth) {
    basketX += 7;
  } else if(leftPressed && basketX > 0) {
    basketX -= 7;
  }
}

function draw() {
  if(gameOver) {
    ctx.font = '24px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Game Over! Score: ' + score, 50, canvas.height / 2);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBasket();
  drawBall();
  drawScore();
  detectCollision();
  moveBasket();

  ballY += ballDY;

  requestAnimationFrame(draw);
}

draw();
