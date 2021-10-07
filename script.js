const gameBoard = (() => {
   
    board = [" ", " ", " ",
             " ", " ", " ",
             " ", " ", " "];

    const playTurn = (player, position) => {
        board[position] = player;
    }

    return {playTurn, board}
})();

const displayController = (() => {
    
})();