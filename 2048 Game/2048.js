const gameContainer = document.getElementById('game-container');
let tiles = [];

function createTile(value = 0) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.textContent = value ? value : '';
    if (value) {
        tile.classList.add(`tile-${value}`);
    }
    return tile;
}

function initializeBoard() {
    for (let i = 0; i < 16; i++) {
        const tile = createTile();
        tiles.push(tile);
        gameContainer.appendChild(tile);
    }
    addRandomTile();
    addRandomTile();
}

function addRandomTile() {
    const emptyTiles = tiles.filter(tile => !tile.textContent);
    if (emptyTiles.length > 0) {
        const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        const value = Math.random() < 0.9 ? 2 : 4;
        randomTile.textContent = value;
        randomTile.classList.add(`tile-${value}`);
    }
}

function moveTiles(direction) {
    let hasMoved = false;
    for (let i = 0; i < 4; i++) {
        let rowOrCol = [];
        for (let j = 0; j < 4; j++) {
            const index = direction === 'up' || direction === 'down' ? i + j * 4 : j + i * 4;
            rowOrCol.push(tiles[index]);
        }
        if (direction === 'right' || direction === 'down') rowOrCol.reverse();
        const moved = moveAndMergeRowOrCol(rowOrCol);
        if (moved) hasMoved = true;
        if (direction === 'right' || direction === 'down') rowOrCol.reverse();
        for (let j = 0; j < 4; j++) {
            const index = direction === 'up' || direction === 'down' ? i + j * 4 : j + i * 4;
            tiles[index] = rowOrCol[j];
        }
    }
    if (hasMoved) addRandomTile();
}

function moveAndMergeRowOrCol(rowOrCol) {
    let moved = false;
    for (let i = 0; i < rowOrCol.length; i++) {
        for (let j = i + 1; j < rowOrCol.length; j++) {
            if (!rowOrCol[i].textContent && rowOrCol[j].textContent) {
                rowOrCol[i].textContent = rowOrCol[j].textContent;
                rowOrCol[i].className = rowOrCol[j].className;
                rowOrCol[j].textContent = '';
                rowOrCol[j].className = 'tile';
                moved = true;
                break;
            } else if (rowOrCol[i].textContent && rowOrCol[i].textContent === rowOrCol[j].textContent) {
                rowOrCol[i].textContent *= 2;
                rowOrCol[i].className = `tile tile-${rowOrCol[i].textContent}`;
                rowOrCol[j].textContent = '';
                rowOrCol[j].className = 'tile';
                moved = true;
                break;
            } else if (rowOrCol[j].textContent) {
                break;
            }
        }
    }
    return moved;
}

function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveTiles('up');
            break;
        case 'ArrowDown':
            moveTiles('down');
            break;
        case 'ArrowLeft':
            moveTiles('left');
            break;
        case 'ArrowRight':
            moveTiles('right');
            break;
    }
}

initializeBoard();
document.addEventListener('keydown', handleKeyPress);
