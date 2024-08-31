import './style.css'
import {useState} from "react";

function Square({value, onSquareClick}: { value: String, onSquareClick: () => void }) {
  return (
      <button className='square' onClick={onSquareClick}>{value}</button>
  )
}

export default function Game() {
  // const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1);

  }

  function JumpTo(nextMove:number) {
    setCurrentMove(nextMove);

  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
        <li>
          <button onClick={() => JumpTo(move)}>{description}</button>
        </li>
    );
  })

  return (
      <div className='game'>
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
        </div>

        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
  );
}


function Board({xIsNext, squares, onPlay}: {
  xIsNext: boolean,
  squares: string[],
  onPlay: (nextSquares: string[]) => void
}) {

  const winner = calculateWinner(squares)
  let desc;
  if (winner) {
    desc = "Winner: " + winner;
  } else {
    desc = "Next player: " + (xIsNext ? 'X' : 'O');
  }

  function handleClick({i}: { i: number }) {
    if (squares[i] || calculateWinner(squares)) {
      return
    }
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[i] = 'X'
    } else {
      nextSquares[i] = 'O'
    }
    onPlay(nextSquares)
  }


  return (
      <>
        <div>{desc}</div>
        <div className='board-row'>
          <Square value={squares[0]} onSquareClick={() => handleClick({i: 0})}></Square>
          <Square value={squares[1]} onSquareClick={() => handleClick({i: 1})}></Square>
          <Square value={squares[2]} onSquareClick={() => handleClick({i: 2})}></Square>
        </div>
        <div className='board-row'>
          <Square value={squares[3]} onSquareClick={() => handleClick({i: 3})}></Square>
          <Square value={squares[4]} onSquareClick={() => handleClick({i: 4})}></Square>
          <Square value={squares[5]} onSquareClick={() => handleClick({i: 5})}></Square>
        </div>
        <div className='board-row'>
          <Square value={squares[6]} onSquareClick={() => handleClick({i: 6})}></Square>
          <Square value={squares[7]} onSquareClick={() => handleClick({i: 7})}></Square>
          <Square value={squares[8]} onSquareClick={() => handleClick({i: 8})}></Square>
        </div>
      </>
  )
}


function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
