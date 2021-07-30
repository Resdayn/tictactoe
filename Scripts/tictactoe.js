const gameBoard = (() => {
    const _board = ["X", "X", "X","O", "O", "X","X", "X", "O"]

    const getBoard = () => {
        return _board;
    }

    return {
        getBoard
    }

})();

function generateBoard() {
    // Takes in the board array, generates a div with the value in the square and appends it to the html board
    let board = gameBoard.getBoard();
    board.forEach((square, index) => {
        let newSquare = document.createElement('div');
        newSquare.id = `square-${index}`;
        newSquare.innerText = square;
        newSquare.classList.add("square");
        
        let board = document.querySelector("#board");
        board.append(newSquare);
    });
}

generateBoard();

function cleanBoard() {
    // Set all elements in the array to empty
    board = gameBoard.getBoard();
    board.fill("");
    
    // Deletes all children in board html
    deleteBoardSquares();

    generateBoard();
}

function deleteBoardSquares() {
    let htmlBoard = document.querySelector("#board");
    while (board.firstChild) {
        board.removeChild(board.firstChild)
    }
}