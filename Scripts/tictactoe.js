const gameBoard = (() => {
    const _board = ["X", "X", "X","O", "O", "X","X", "X", "O"]

    const getBoard = () => {
        return _board;
    }

    const generateBoard = () => {
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

    const cleanBoard = () => {
        // Set all elements in the array to empty
        board = gameBoard.getBoard();
        board.fill("");
    
        // Deletes all children in board html
        deleteBoardSquares();

        generateBoard();
    }

    const deleteBoardSquares = () => {
        let htmlBoard = document.querySelector("#board");
        while (htmlBoard.firstChild) {
            htmlBoard.removeChild(htmlBoard.firstChild)
        }
    }

    return {
        getBoard,
        generateBoard,
        cleanBoard
    }

})();

// Generates the board on page load
window.addEventListener('load', gameBoard.generateBoard);

// Event Listener for the start button
document.querySelector("#start-button").addEventListener('click', gameBoard.cleanBoard);