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

    const getBoard = () => board;

    return {playTurn, getBoard, isEmpty}
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

    // Update the status of the game
    const updateStatus = (playerMark) => {
        const turnStatus = document.getElementById('turnStatus');
        turnStatus.textContent = `Player ${playerMark.getMark()}'s Turn`;
    }
    updateStatus(p1);

    // Add click events to the game board
    const grids = document.querySelectorAll('.grid');
    grids.forEach((grid) => {
        grid.addEventListener('click', () => {
            let currentPosition = grid.getAttribute('data-position')
            if (gameBoard.isEmpty(currentPosition)) {
                gameBoard.playTurn(currentTurn.getMark(), currentPosition);
                grid.classList.remove('selected'); //Remove the hover effect
                // Change the player turn once turn is completed
                if (currentTurn == p1) {
                    currentTurn = p2;
                } else {
                    currentTurn = p1;
                };
                // Display new status
                updateStatus(currentTurn)
            }
        });
    })
    
})();


