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
    console.log(game.board.map(row => row.join('|')).join('\n'));
};

//Make Move/Player Function
function makeMove(player, row, column) {
    if (game.board[row][column] === '') {
        game.board[row][column] = player;
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

//Game Start Function
function gameStart() {
    //Initial player is X
    let player = 'X';

    while (true) {

        //Display Board
        updateBoard();

        //Prompt user row and column
        let row = parseInt(prompt(`Player ${player}, enter row 0, 1, or 2:`));
        let col = parseInt(prompt(`Player ${player}, enter col 0, 1, or 2:`));

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
        player = (player === 'X') ? 'O' : 'X';
    }
}

//call to start game
gameStart();