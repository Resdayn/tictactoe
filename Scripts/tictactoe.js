const gameBoard = (() => {
    const _board = ["X", "X", "X","O", "O", "X","X", "X", "O"]

    getBoard = () => {
        return _board;
    }

    return {
        getBoard
    }

})();

function generateBoard() {
    // Takes in the board array, generates a div with the value in the square and appends it to the html board
    board = gameBoard.getBoard();
    board.forEach((square, index) => {
        let newSquare = document.createElement('div');
        newSquare.id = `square-${index}`;
        newSquare.innerText = square;
        
        let board = document.querySelector("#board");
        board.append(newSquare);
    });
}

generateBoard();