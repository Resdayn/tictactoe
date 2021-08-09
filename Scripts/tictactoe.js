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
                if (gameBoard.checkWinner(gameBoard.getMark()) === true){
                    console.log(`Winner is ${gameBoard.getMark()}`)
                    gameBoard.displayWinner();
                    gameBoard.stopGame();
                    return;
                }
                gameBoard.swapCurrentUser();

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
        
    }

    const getMark = () => {
        if (_currentUser === 'player1') {
            return 'X';
        } else if (_currentUser ==='player2'){
            return 'O';
        }
    }

    const checkWinner = (mark) => {
        // Returns true if any of the combinations is matched for the selected mark
        console.log(`Checking for ${mark}`);

        if (gameBoard.getBoard()[0] === mark && gameBoard.getBoard()[1] === mark && gameBoard.getBoard()[2] === mark ||
        gameBoard.getBoard()[3] === mark && gameBoard.getBoard()[4] === mark && gameBoard.getBoard()[5] === mark ||
        gameBoard.getBoard()[6] === mark && gameBoard.getBoard()[7] === mark && gameBoard.getBoard()[8] === mark ||
        gameBoard.getBoard()[0] === mark && gameBoard.getBoard()[3] === mark && gameBoard.getBoard()[6] === mark ||
        gameBoard.getBoard()[1] === mark && gameBoard.getBoard()[4] === mark && gameBoard.getBoard()[7] === mark ||
        gameBoard.getBoard()[2] === mark && gameBoard.getBoard()[5] === mark && gameBoard.getBoard()[8] === mark ||
        gameBoard.getBoard()[0] === mark && gameBoard.getBoard()[4] === mark && gameBoard.getBoard()[8] === mark ||
        gameBoard.getBoard()[2] === mark && gameBoard.getBoard()[4] === mark && gameBoard.getBoard()[6] === mark){
            return true
        }
    }

    const displayWinner = (player) => {
        // TODO: This is not properly displaying the winner. In the called function in the event lister, add the current player as the argument.
        console.log("displayWinner Invoked")
        let displayScreen = document.querySelector("#display-screen");
        if (player === 'player1'){
            displayScreen.innerText = 'Player 1 Wins!';
        } else if (player === 'player2') {
            displayScreen.innerText = 'Player 2 Wins!';
        } 
    }

    const stopGame = () => {
        gameBoard.getSquares().forEach((square) => {
            square.removeEventListener('click', () => {
                gameBoard.markSquare(i);
            })
        });
    }

    return {
        getBoard,
        getSquares,
        generateBoard,
        cleanBoard,
        markSquare,
        getCurrentUser,
        swapCurrentUser,
        getMark,
        checkWinner,
        displayWinner,
        stopGame
    }

})();

// Generates the board on page load
gameBoard.generateBoard();

// Event Listener for the start button
document.querySelector("#start-button").addEventListener('click', gameBoard.cleanBoard);