import React, { useState } from 'react';
import Board from './Board';

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const winner = calculateWinner(currentSquares);

  const handleClick = (index) => {
    if (winner || currentSquares[index]) return;

    const newSquares = currentSquares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';

    const newHistory = history.slice(0, currentMove + 1).concat([newSquares]);
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  };

  const jumpTo = (move) => {
    setCurrentMove(move);
  };

  const moves = history.map((step, move) => {
    const description = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (currentMove === 9) {
    status = 'Draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <h1>React Tic-Tac-Toe</h1>
      <Board squares={currentSquares} onClick={handleClick} />
      <div className="info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;

// Helper function to determine the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}
