// Basic module pattern for the gameboard
const gameBoard = (() => {
   
    board = [" ", " ", " ",
             " ", " ", " ",
             " ", " ", " "];

    const playTurn = (player, position) => {
        board[position] = player;
    }

    const getBoard = () => {return board};

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
})();

