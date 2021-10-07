// Basic module pattern for the gameboard
const gameBoard = (() => {
   
    board = [" ", " ", " ",
             " ", " ", " ",
             " ", " ", " "];

    const playTurn = (player, position) => {
        board[position] = player;
    }

    return {playTurn, board}
})();

// Basic module pattern for the displaying of the content to the website
const displayController = (() => {

})();