const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const birdSize = 20;
const gravity = 0.25;
const lift = -5;
const pipeWidth = 50;
const pipeGap = 100;
const pipeSpeed = 2;

let birdY = canvas.height / 2;
let birdSpeed = 0;
let pipes = [];
let frame = 0;

document.addEventListener('keydown', () => {
  birdSpeed = lift;
});

function drawBird() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(50, birdY, birdSize, birdSize);
}

function drawPipe(pipe) {
  ctx.fillStyle = 'green';
  ctx.fillRect(pipe.x, 0, pipeWidth, pipe.height);
  ctx.fillRect(pipe.x, pipe.height + pipeGap, pipeWidth, canvas.height - pipe.height - pipeGap);
}

function updatePipes() {
  if (frame % 90 === 0) {
    const height = Math.random() * (canvas.height - pipeGap - 50) + 50;
    pipes.push({ x: canvas.width, height });
  }
  
  pipes = pipes.map(pipe => ({
    x: pipe.x - pipeSpeed,
    height: pipe.height
  })).filter(pipe => pipe.x + pipeWidth > 0);
}

function checkCollision() {
  if (birdY < 0 || birdY + birdSize > canvas.height) return true;
  
  return pipes.some(pipe => 
    50 < pipe.x + pipeWidth &&
    50 + birdSize > pipe.x &&
    (birdY < pipe.height || birdY + birdSize > pipe.height + pipeGap)
  );
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  birdSpeed += gravity;
  birdY += birdSpeed;
  
  drawBird();
  
  updatePipes();
  pipes.forEach(drawPipe);
  
  if (checkCollision()) {
    alert('Game Over');
    document.location.reload();
  }

  frame++;
}

setInterval(draw, 1000 / 60);
