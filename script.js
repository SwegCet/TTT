// Making the game private by encapsulating
const gameStart = () => {
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    let currentPlayer = 'X';

    //Update Board after every player action
    const updateBoard = () => {
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
                cell.context = board[i][j];
                gameBoard.appendChild(cell);
                //make cells clickable (addEventListener, click, call handleMove())
                cell.addEventListener('click', handleMove)

            }
        }
    };

    //Create a handleMove function: I.E handleMove(event)
    //This function will handle the row and column logic
    const handleMove = (event) => {
        const row = event.target.getAttribute('data-row');
        const column = event.target.getAttribute('data-column');

        //Only allow a move if there's an empty cell
        if (board[row][column] === '') {
            //call makeMove function 
            makeMove(currentPlayer, row, column);
        }
    };

    //Make Move/Player Function
    const makeMove = (player, row, column) => {
        //Mark the coordinate as a player option
        board[row][column] = player;

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
    };
    //Function to switch player
    const switchPlayer = () => {
        //Ternary operator to switch the players
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    };

    //Check Win function
    const checkWin = (currentPlayer) => {
        //Check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === currentPlayer
                && board[i][1] === currentPlayer
                && board[i][2] === currentPlayer) {
                return true;
            }
        }
        //Check columns
        for (let j = 0; j < 3; j++) {
            if (board[0][j] === currentPlayer
                && board[1][j] === currentPlayer
                && board[2][j] === currentPlayer) {
                return true;
            }
        }
        //Check Diagonal
        if ((board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer)
            || (board[2][0] === currentPlayer && board[1][1] === currentPlayer && board[0][2] === currentPlayer)) {
            return true;
        }
        return false;
    };

    //Check Draw
    const checkDraw = () => {
        //check if cells are filled
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    return false; //we found an empty cell so it returns false
                }
            }
        }
        return true; //we found no empty cells
    };

    //Clear the board after win
    const resetGame = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[i][j] = '';
            }
        };
        currentPlayer = 'X';
        updateBoard();
    };

    return {
        start: updateBoard
    };
};

//Add event listner to button
document.querySelector('#start').addEventListener('click', () => {
    const game = gameStart();
    game.start();
})