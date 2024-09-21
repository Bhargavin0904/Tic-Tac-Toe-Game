const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (gameState[index] || !isGameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin()) {
        drawWinningLine();
        isGameActive = false;
    } else if (gameState.every(cell => cell)) {
        messageElement.textContent = "It's a draw!";
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        if (combination.every(index => gameState[index] === currentPlayer)) {
            winningCombination = combination;
            return true;
        }
        return false;
    });
}

function drawWinningLine() {
    const line = document.createElement('div');
    line.classList.add('line');

    const [a, b, c] = winningCombination;
    if (a === 0 && b === 1 && c === 2) {
        line.classList.add('horizontal');
        line.style.top = '16.66%';
    } else if (a === 3 && b === 4 && c === 5) {
        line.classList.add('horizontal');
        line.style.top = '50%';
    } else if (a === 6 && b === 7 && c === 8) {
        line.classList.add('horizontal');
        line.style.top = '83.33%';
    } else if (a === 0 && b === 3 && c === 6) {
        line.classList.add('vertical');
        line.style.left = '16.66%';
    } else if (a === 1 && b === 4 && c === 7) {
        line.classList.add('vertical');
        line.style.left = '50%';
    } else if (a === 2 && b === 5 && c === 8) {
        line.classList.add('vertical');
        line.style.left = '83.33%';
    } else if (a === 0 && b === 4 && c === 8) {
        line.classList.add('diagonal-right');
        line.style.top = '50%';
        line.style.left = '50%';
    } else if (a === 2 && b === 4 && c === 6) {
        line.classList.add('diagonal-left');
        line.style.top = '50%';
        line.style.left = '50%';
    }
    board.appendChild(line);
    line.style.width = '100%';
    // messageElement.textContent = Player {currentPlayer} wins;
}

function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
    isGameActive = true;
    messageElement.textContent = '';
    const line = document.querySelector('.line');
    if (line) {
        line.remove();
    }
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));