// Variables for DOM elements
const gameBoard = document.getElementById("game-board");
const cells = gameBoard.getElementsByTagName("td");
const gameHeading = document.getElementById("game-heading");
const restartBtn = document.getElementById("restart-btn");

let currentPlayer = "X"; // Turn tracker
let gameState = Array(9).fill(""); // Arr with 9 empty str

function updateHeading() { // Update heading text based on the current player's turn
    gameHeading.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() { // Check for a winner or a draw
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combination of winningCombinations) { // Iterate through possible winning combinations
    const [a, b, c] = combination;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      return gameState[a];
    }
  }

  if (!gameState.includes("")) {
    return "draw";
  }

  return null;
}

// Handle player turns and update game board
function handlePlayerTurn(event) {
  const cellIndex = Array.from(cells).indexOf(event.target); // Convert cells to arr and find index of clicked cell
  if (!event.target.textContent && !checkWinner()) { // If the clicked cell is empty and there's no winner yet..
    event.target.textContent = currentPlayer; // Set clicked cell's content to the current player's symbol (X or O)
    gameState[cellIndex] = currentPlayer; // Update the position in the gameState array with the correct symbol

    const winner = checkWinner();
    if (winner) {
      if (winner === "draw") {
        gameHeading.textContent = "It's a Draw!";
      } else { // If there is a winner..
        gameHeading.textContent = `Player ${winner} Wins!`;
      }
    } else { 
      currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch turns if there's no winner yet
      updateHeading();
    }
  }
}

function restartGame() { // Clear the grid and start a new game
  currentPlayer = "X";
  gameState = Array(9).fill("");
  for (let cell of cells) {
    cell.textContent = "";
  }
  updateHeading();
}

// Event listeners
for (let cell of cells) {
  cell.addEventListener("click", handlePlayerTurn);
}
restartBtn.addEventListener("click", restartGame);

// Initialize the game
updateHeading();
