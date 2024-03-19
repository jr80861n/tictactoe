class TicTacToe {
  constructor() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.winner = null;
    this.xWins = 0;
    this.oWins = 0;
    this.moveHistory = [];
    this.cells = document.querySelectorAll('.cell');
    this.cells.forEach((cell, index) => {
      cell.addEventListener('click', () => this.makeMove(index));
    });
    document.getElementById('restart-button').addEventListener('click', () => this.reset());
    this.updateBoard();
    this.updateTurnIndicator();
  }
  checkWin() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        this.winner = this.board[a]; 
        return true;
      }
    }

    return false;
  }
  undoMove() {
    if (this.moveHistory.length === 0) {
      console.log('No moves to undo.');
      return;
    }
    
    const lastMove = this.moveHistory.pop();
    this.board = lastMove.board;
    this.currentPlayer = lastMove.currentPlayer;
    this.winner = null;
    this.cells.forEach(cell => cell.classList.remove('winning-cell'));
    this.updateBoard();
    this.updateTurnIndicator();
  }
  

  makeMove(position) {
    // Check if the cell is already taken or if the game has a winner
    if (this.board[position] !== null || this.winner !== null) {
      console.log('Invalid move. Please try again.');
      return;
    }

    // Make the move for the current player
    this.board[position] = this.currentPlayer;
    // Update the board UI
    this.updateBoard();
    // Add the current state to move history
    this.moveHistory.push({ board: [...this.board], currentPlayer: this.currentPlayer });

    // Check for a win
    if (this.checkWin()) {
      this.updateScoreboard();
      this.highlightWinningCells();
      alert(`Player ${this.currentPlayer} wins!`);
      // End the game, no more moves allowed
      return;
    }

    // Check for a draw
    if (this.checkDraw()) {
      alert("It's a draw!");
      // End the game, no more moves allowed
      return;
    }

    // No win or draw, switch to the other player
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    // Update the turn indicator UI
    this.updateTurnIndicator();
  }

  updateBoard() {
    this.cells.forEach((cell, index) => {
      cell.textContent = this.board[index];
    });
    console.log("Current board state:", this.board); // Add this line for diagnostic purposes
  }

  checkGameStatus() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.winner = this.board[a];
        return;
      }
    }
  }

  highlightWinningCells() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    winningCombinations.forEach(combination => {
      const [a, b, c] = combination;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.cells[a].classList.add('winning-cell');
        this.cells[b].classList.add('winning-cell');
        this.cells[c].classList.add('winning-cell');
      }
    });
  }

  checkDraw() {
    return this.board.every((cell) => cell !== null) && !this.winner;
  }

  updateTurnIndicator() {
    const playerTurn = document.getElementById('player-turn');
    playerTurn.textContent = `Player ${this.currentPlayer}'s Turn`;
  }

  updateScoreboard() {
    if (this.winner === 'X') {
      this.xWins++;
      document.getElementById('x-wins').textContent = this.xWins;
    } else if (this.winner === 'O') {
      this.oWins++;
      document.getElementById('o-wins').textContent = this.oWins;
    }
  }

  reset() {
    this.board.fill(null);
    this.winner = null;
    this.moveHistory = [];
    this.currentPlayer = 'X'; // Reset to player X
    this.cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('winning-cell');
    });
    this.updateBoard();
    this.updateTurnIndicator();
  }
  

  updateBoard() {
    this.cells.forEach((cell, index) => {
      cell.textContent = this.board[index];
    });
  }
  resetGame() {
    // Reset the scoreboard
    this.xWins = 0;
    this.oWins = 0;
    document.getElementById('x-wins').textContent = this.xWins;
    document.getElementById('o-wins').textContent = this.oWins;

    // Reset the game
    this.reset();
  }
}

const game = new TicTacToe();

document.getElementById('undo-button').addEventListener('click', () => game.undoMove());
document.getElementById('game-reset-button').addEventListener('click', () => game.resetGame());
// Modal interaction code
const modal = document.getElementById("instructions-modal");
const btn = document.getElementById("instruction-button");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}