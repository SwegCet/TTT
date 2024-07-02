//Store gameboard in a gameboard object
const game = {
    board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
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
            const cell = document.createElement('cell');
            cell.setAttribute('data-row', i);
            cell.setAttribute('data-column', j);
            //Populating array 
            cell.context = game.board[i][j];
            //make cells clickable (addEventListener, click, call handleMove())
            cell.addEventListener('click', handleMove())
            gameBoard.appendChild(cell);
        }
    }
    //populate array after each click


    //console.log(game.board.map(row => row.join('|')).join('\n'));
};

//Create a handleMove function: I.E handleMove(event)
//This function will handle the row and column logic

//Make Move/Player Function
function makeMove(player, row, column) {
    //Instead I think we could make, makeMove factory
    //row and column can be an object 

    if (game.board[row][column] === '') {
        game.board[row][column] = player;
        //update cell display here
        return true;
    }
    return false;
}

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

//Here is where switch player will go for game

//Game Start Function
function gameStart() {
    //document.querySelector('#start').addEventListener('click', () => {
    //const playerOneName = document.querySelector('.playerOne').value}
    //const playerTwoName = document.querySelector('.playerTwo').value}

    //Assigning player1 and player2
    //const player1 = {name: playerOneName, symbol: 'X'};
    //const player2 = {name: playerTwoName, symbol: 'O'};

    //})

    //Initial player is X
    //let player = 'X';

    while (true) {

        //Display Board
        updateBoard();

        //Prompt user row and column
        //comment this out since we're not using it anymore
        //let row = parseInt(prompt(`Player ${player}, enter row 0, 1, or 2:`));
        //let col = parseInt(prompt(`Player ${player}, enter col 0, 1, or 2:`));

        if (!makeMove(player, row, col)) {
            console.log('Invalid move, try again.');
            continue;
        };
        //If statement to check win
        if (checkWin(player)) {
            updateBoard();
            console.log(`Player ${player} Wins!`);
            break;
        }

        //If statement to check draw
        if (checkDraw()) {
            updateBoard();
            console.log(`It's a draw!`);
            break;
        }

        //Ternary Operator to Switch between the players
        //make this it's seperate function and call it
        player = (player === 'X') ? 'O' : 'X';
    }
}

//call to start game
// gameStart();