// Basic module pattern for the gameboard
const gameBoard = (() => {
   
    board = [" ", " ", " ",
             " ", " ", " ",
             " ", " ", " "];

    const playTurn = (player, position) => {
        board[position] = player;
        displayController.refreshBoard();
    }

    const getBoard = () => board;

    return {playTurn, getBoard}
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
                gameBoard.playTurn(currentTurn.getMark(), grid.getAttribute('data-position'));
                if (currentTurn == p1) {
                    currentTurn = p2;
                } else {
                    currentTurn = p1;
                };
                updateStatus(currentTurn)
        });
    })
    
})();


