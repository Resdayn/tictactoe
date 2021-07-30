const gameBoard = (() => {
    let _board = ["X", "X", "X","O", "O", "X","X", "X", "O"]
    
    const getBoard = () => {
        return _board;
    }

    const getSquares = () => {
        const _squares = document.querySelectorAll(".square");
        return _squares;
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

        // Event Listener for ticking each square
        gameBoard.getSquares().forEach((square, i) => {
            square.addEventListener('click', () => {
                gameBoard.markSquare(i);
            })
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

    const markSquare = (index) => {
        if (gameBoard.getBoard()[index] === ""){
            gameBoard.getBoard()[index] = 'X';
        }

        gameBoard.getSquares()[index].innerText = 'X';
        gameBoard.getSquares()[index].style.color = 'blue';
    }

    return {
        getBoard,
        getSquares,
        generateBoard,
        cleanBoard,
        markSquare
    }

})();

// Generates the board on page load
gameBoard.generateBoard();

// Event Listener for the start button
document.querySelector("#start-button").addEventListener('click', gameBoard.cleanBoard);