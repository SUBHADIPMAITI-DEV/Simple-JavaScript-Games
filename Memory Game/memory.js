const gameGrid = document.getElementById('gameGrid');
const cardsArray = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  const shuffledCards = shuffle([...cardsArray]);
  shuffledCards.forEach((value, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.value = value;
    cardElement.addEventListener('click', handleCardClick);
    gameGrid.appendChild(cardElement);
  });
}

function handleCardClick(event) {
  if (lockBoard) return;
  const clickedCard = event.target;
  
  if (clickedCard === firstCard) return;
  
  clickedCard.classList.add('flipped');
  clickedCard.textContent = clickedCard.dataset.value;
  
  if (!firstCard) {
    firstCard = clickedCard;
  } else {
    secondCard = clickedCard;
    checkForMatch();
  }
}

function checkForMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', handleCardClick);
  secondCard.removeEventListener('click', handleCardClick);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    firstCard.textContent = '';
    secondCard.textContent = '';
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

createBoard();
