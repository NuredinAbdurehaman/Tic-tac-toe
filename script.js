const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const resetScoresButton = document.getElementById('resetScoresButton');
const statusDisplay = document.getElementById('status');
const xWinsDisplay = document.getElementById('xWins');
const oWinsDisplay = document.getElementById('oWins');

let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];
let xWins = 0;
let oWins = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (boardState[index] !== '' || !gameActive) {
        return;
    }

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[b] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} has won!`;
        if (currentPlayer === 'X') {
            xWins++;
            xWinsDisplay.textContent = xWins;
        } else {
            oWins++;
            oWinsDisplay.textContent = oWins;
        }
        gameActive = false;
        return;
    }

    if (!boardState.includes('')) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn.`;
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `It's ${currentPlayer}'s turn.`;
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

function resetScores() {
    xWins = 0;
    oWins = 0;
    xWinsDisplay.textContent = xWins;
    oWinsDisplay.textContent = oWins;
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
resetScoresButton.addEventListener('click', resetScores);

// Initialize status
statusDisplay.textContent = `It's ${currentPlayer}'s turn.`;