const gameBoard = (() => {
    let _board = ["", "", "","", "", "","", "", ""]
    
    let _currentUser = 'player1'

    const getBoard = () => {return _board}

    const getSquares = () => {
        const _squares = document.querySelectorAll(".square");
        return _squares;
    }

    const getCurrentUser = () => {return _currentUser}

    let swapCurrentUser = () => {
        let displayScreen = document.querySelector("#display-screen");

        if (_currentUser === 'player1'){
            _currentUser = 'player2'
            displayScreen.innerText = 'Player 2 plays now!'
        } else if (_currentUser === 'player2'){
            _currentUser = 'player1'
            displayScreen.innerText = 'Player 1 plays now!'
        }
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
        if (gameBoard.getBoard()[index] !== ""){
            return;
        }

        if (gameBoard.getCurrentUser() === 'player1'){
            gameBoard.getBoard()[index] = 'X';
            gameBoard.getSquares()[index].innerText = 'X';
            gameBoard.getSquares()[index].style.color = 'blue';    
        } else if (gameBoard.getCurrentUser() === 'player2') {
            gameBoard.getBoard()[index] = 'O';
            gameBoard.getSquares()[index].innerText = 'O';
            gameBoard.getSquares()[index].style.color = 'red';
        }

        gameBoard.swapCurrentUser();
        
    }

    const checkWinner = (mark) => {
        // Returns true if any of the combinations is matched for the selected mark

        if (gameBoard.getCurrentUser() === 'player1'){
            mark = 'X'
        } else {mark = 'O'}

        if (board.getBoard()[0] === mark && board.getBoard()[1] === mark && board.getBoard()[2] === mark ||
        board.getBoard()[3] === mark && board.getBoard()[4] === mark && board.getBoard()[5] === mark ||
        board.getBoard()[6] === mark && board.getBoard()[7] === mark && board.getBoard()[8] === mark ||
        board.getBoard()[0] === mark && board.getBoard()[3] === mark && board.getBoard()[6] === mark ||
        board.getBoard()[1] === mark && board.getBoard()[4] === mark && board.getBoard()[7] === mark ||
        board.getBoard()[2] === mark && board.getBoard()[5] === mark && board.getBoard()[8] === mark ||
        board.getBoard()[0] === mark && board.getBoard()[4] === mark && board.getBoard()[8] === mark ||
        board.getBoard()[2] === mark && board.getBoard()[4] === mark && board.getBoard()[6] === mark){
            return true
        }
    }

    return {
        getBoard,
        getSquares,
        generateBoard,
        cleanBoard,
        markSquare,
        getCurrentUser,
        swapCurrentUser,
        checkWinner
    }

})();

// Generates the board on page load
gameBoard.generateBoard();

// Event Listener for the start button
document.querySelector("#start-button").addEventListener('click', gameBoard.cleanBoard);