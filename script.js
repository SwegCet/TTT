//Store gameboard in a gameboard object
const game = {
    board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    currentPlayer: 'X'
};

//Update Board after every player action
function updateBoard() {
    //Select gameboard div w querySelector
    const gameBoard = document.querySelector('.gameboard');
    gameBoard.innerHTML = '';
    //make gameboard div display grid
    //Create 9 cells for 3 x 3
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.setAttribute('data-row', i);
            cell.setAttribute('data-column', j);
            //Populating array 
            cell.context = game.board[i][j];
            gameBoard.appendChild(cell);
            //make cells clickable (addEventListener, click, call handleMove())
            cell.addEventListener('click', handleMove)

        }
    }
    //console.log(game.board.map(row => row.join('|')).join('\n'));
};

//Create a handleMove function: I.E handleMove(event)
//This function will handle the row and column logic
function handleMove(event) {
    const row = event.target.getAttribute('data-row');
    const column = event.target.getAttribute('data-column');

    //Only allow a move if there's an empty cell
    if (game.board[row][column] === '') {
        //call makeMove function 
        makeMove(game.currentPlayer, row, column);
    }
};

//Make Move/Player Function
function makeMove(player, row, column) {
    //Mark the coordinate as a player option
    game.board[row][column] = player;

    //Update the cell display
    const cell = document.querySelector(`[data-row="${row}"][data-column="${column}"]`)
    cell.textContent = player;

    //We check win conditions/Draw conditions here
    if (checkWin(player)) {
        alert(`${player} wins!`);
        //Clear Board
        resetGame();
    }
    else if (checkDraw()) {
        alert('Draw!');
        //Clear Board
        resetGame();
    }
    else {
        //Call a switch function to switch players
        switchPlayer();
    }
}

function switchPlayer() {
    //Ternary operator to switch the players
    game.currentPlayer = (game.currentPlayer === 'X') ? 'O' : 'X';
};

//Check Win function
function checkWin(currentPlayer) {
    //Check rows
    for (let i = 0; i < 3; i++) {
        if (game.board[i][0] === currentPlayer && game.board[i][1] === currentPlayer && game.board[i][2] === currentPlayer) {
            return true;
        }
    }
    //Check columns
    for (let j = 0; j < 3; j++) {
        if (game.board[0][j] === currentPlayer && game.board[1][j] === currentPlayer && game.board[2][j] === currentPlayer) {
            return true;
        }
    }
    //Check Diagonal
    if ((game.board[0][0] === currentPlayer && game.board[1][1] === currentPlayer && game.board[2][2] === currentPlayer) || (game.board[2][0] === currentPlayer && game.board[1][1] === currentPlayer && game.board[0][2] === currentPlayer)) {
        return true;
    }
    return false;
}

//Check Draw
function checkDraw() {
    //check if cells are filled
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (game.board[i][j] == '') {
                return false; //we found an empty cell so it returns false
            }
        }
    }
    return true; //we found no empty cells
}

//Here is resetting the gameboard
function resetGame() {
    game.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    game.currentPlayer = 'X';
    updateBoard();
}

//Game Start Function
function gameStart() {
    //We dont want it to loop infinitely
    //Since we're doing UI, we can do it based off clicks

    //This will initialize the 3x3 gameboard
    updateBoard();

    //Rest of the functionality is from callbacks
}

