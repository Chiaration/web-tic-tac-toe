// Basic module pattern for the gameboard
const gameBoard = (() => {
   
    board = [" ", " ", " ",
             " ", " ", " ",
             " ", " ", " "];

    const playTurn = (player, position) => {
        board[position] = player;
        displayController.refreshBoard();
    }

    const isEmpty = (position) => {
        if (board[position] == " ") {
            return true;
        } else {
            return false;
        }
    }

    const checkWinner = (Player) => {
        if ((board[0] == Player.getMark() && board[1] == Player.getMark() && board[2] == Player.getMark())
         || (board[3] == Player.getMark() && board[4] == Player.getMark() && board[5] == Player.getMark())
         || (board[6] == Player.getMark() && board[7] == Player.getMark() && board[8] == Player.getMark())
         || (board[0] == Player.getMark() && board[3] == Player.getMark() && board[6] == Player.getMark())
         || (board[1] == Player.getMark() && board[4] == Player.getMark() && board[7] == Player.getMark())
         || (board[2] == Player.getMark() && board[5] == Player.getMark() && board[8] == Player.getMark())
         || (board[0] == Player.getMark() && board[4] == Player.getMark() && board[8] == Player.getMark())
         || (board[2] == Player.getMark() && board[4] == Player.getMark() && board[6] == Player.getMark())) {
             return Player
        } else {
            return false;
        }
    }

    const isTie = () => {
        if (board.includes(" ")) {
            return false;
        } else {
            return true;
        }
    }

    const getBoard = () => board;

    return {playTurn, getBoard, isEmpty, checkWinner, isTie}
})();

// Basic module pattern for the displaying of the content to the website
const displayController = (() => {
    let currentBoard = gameBoard.getBoard();

    const refreshBoard = () => {
        const grids = document.querySelectorAll('.grid');
        grids.forEach((grid) => {
            grid.innerHTML = currentBoard[grid.getAttribute('data-position')];
        });
    };

    refreshBoard();

    return {refreshBoard}
})();

// Player Objects (Two player game) using Factory Functions
const Player = (mark) => {
    const getMark = () => mark;

    return {getMark}
}

const gameplay = (() => {
    // Create two players
    const p1 = Player('X');
    const p2 = Player('O');
    let currentTurn = p1;
    let winner = false;
    
    // Update the status of the game
    const updateStatus = (playerMark) => {
        const turnStatus = document.getElementById('turnStatus');
        // Check for tie 
        if (winner == false && gameBoard.isTie() == true) {
            turnStatus.textContent = `GAME ENDED ON TIE`;
        } else if (winner) {  //Then check for winner
            turnStatus.textContent = `Player ${playerMark.getMark()} WON`;
        } else if (winner == false) { //Otherwise show player's turn
            turnStatus.textContent = `Player ${playerMark.getMark()}'s Turn`;
        }
    }
    updateStatus(p1);

    // Add click events to the game board
    const grids = document.querySelectorAll('.grid');
    grids.forEach((grid) => {
        grid.addEventListener('click', () => {
            let currentPosition = grid.getAttribute('data-position')
            // Check if the position is empty and check if there is already a winner
            if (gameBoard.isEmpty(currentPosition) && winner == false) {
                gameBoard.playTurn(currentTurn.getMark(), currentPosition);
                grid.classList.remove('selected'); //Remove the hover effect

                console.log(gameBoard.checkWinner(currentTurn));

                if (!gameBoard.checkWinner(currentTurn)) {
                    // Change the player turn once turn is completed
                    if (currentTurn == p1) {
                        currentTurn = p2;
                    } else {
                        currentTurn = p1;
                    };
                } else {
                    // Declare winner 
                    winner = true;
                    // Disable the board 
                    grids.forEach((grid) => {
                        grid.classList.remove('selected');
                    })
                }
                // Display new status
                updateStatus(currentTurn)
            }
        });
    })
    
})();


