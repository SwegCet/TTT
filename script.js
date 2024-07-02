//Print out Empty Gameboard in Console
const gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

console.log(gameBoard)

//Now We need to update it after every player move
function displayBoard() {
    for (let row of gameBoard) {
        console.log(row.join(' | '));
        console.log('---------');
    }
}
//Player Function
function player(player, row, col) {
    if (gameBoard[row][col] === '') {
        gameBoard[row][col] = player;
        return true;
    }
    return false;
}
//Check Win
function checkWin(player) {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
        if (gameBoard[i].every(cell => cell === player) ||
            gameBoard.map(row => row[i]).every(cell => cell === player)) {
            return true;
        }
    }
    // Check diagonals
    if ([0, 1, 2].every(i => gameBoard[i][i] === player) ||
        [0, 1, 2].every(i => gameBoard[i][2 - i] === player)) {
        return true;
    }
    return false;
}

function checkDraw() {
    return gameBoard.flat().every(cell => cell !== '');
}

function checkDraw() {
    return gameBoard.flat().every(cell => cell !== '');
}

//Game Function
function playGame() {
    let currentPlayer = 'X';
    while (true) {
        //Display Board
        displayBoard();
        //Get player input
        let row = parseInt(prompt(`Player ${currentPlayer}, enter row(0, 1, or2): `))
        let col = parseInt(prompt(`Player ${currentPlayer}, enter col(0, 1, or2): `))

        if (!player(currentPlayer, row, col)) {
            console.log('Invalid move, try again.');
            continue;
        }
        if (checkWin(currentPlayer)) {
            displayBoard();
            console.log(`Player ${currentPlayer} wins!`);
            break;
        }

        if (checkDraw()) {
            displayBoard();
            console.log('The game is a draw!');
            break;
        }

        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    }
}
playGame()