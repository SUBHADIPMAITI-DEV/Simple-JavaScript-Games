const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const cellSize = 100;
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
let currentPlayer = 'X';

canvas.addEventListener('click', handleClick);

function handleClick(event) {
  const x = Math.floor(event.offsetX / cellSize);
  const y = Math.floor(event.offsetY / cellSize);

  if (board[y][x] === '') {
    board[y][x] = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    draw();
    checkWinner();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const x = j * cellSize;
      const y = i * cellSize;
      ctx.strokeRect(x, y, cellSize, cellSize);

      if (board[i][j] !== '') {
        ctx.font = '80px Arial';
        ctx.fillText(board[i][j], x + 20, y + 80);
      }
    }
  }
}

function checkWinner() {
  const lines = [
    // Rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    // Columns
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    // Diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]]
  ];

  for (const line of lines) {
    if (line[0] !== '' && line[0] === line[1] && line[1] === line[2]) {
      alert(`${line[0]} wins!`);
      resetGame();
      return;
    }
  }

  if (board.flat().every(cell => cell !== '')) {
    alert('Draw!');
    resetGame();
  }
}

function resetGame() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer = 'X';
  draw();
}

draw();
