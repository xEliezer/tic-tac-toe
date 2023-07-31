/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import Block from './components/Block';

function App() {

  const [state, setState] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");

  const checkWinner = (state: any[]) => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for(let i=0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if(state[a] !== null && state[a] === state[b] && state[a] === state[c])
        return true;
    }
    return false;
  };

  const isDraw = (state: any[]) => {
    return state.every(cell => cell !== null) && !checkWinner(state);
  };

  const handleBlockClick = (index: number) => {
    const stateCopy = Array.from(state);

    if(stateCopy[index] !== null) return;
    stateCopy[index] = currentTurn;

    setState(stateCopy);

    const win = checkWinner(stateCopy);

    if (win) {
      alert(`${currentTurn} won the game`);
    } else if (isDraw(stateCopy)) {
      alert("It's a draw!");
    } else {
      setCurrentTurn(currentTurn === "X" ? "O" : "X");
    }
  };

  useEffect(() => {
    if (isDraw(state)) {
      alert("It's a draw!");
    }
  }, [state]);

  const resetGame = () => {
    setState(Array(9).fill(null));
    setCurrentTurn("X");
  };
  
  return (
    <>
      <div className="container">
        <h1>Tic Tac Toe</h1>
        <div className="board">
          <div className="row">
            <Block onClick={() => handleBlockClick(0)} value={state[0]}/>
            <Block onClick={() => handleBlockClick(1)} value={state[1]}/>
            <Block onClick={() => handleBlockClick(2)} value={state[2]}/>
          </div>
          <div className="row">
            <Block onClick={() => handleBlockClick(3)} value={state[3]}/>
            <Block onClick={() => handleBlockClick(4)} value={state[4]}/>
            <Block onClick={() => handleBlockClick(5)} value={state[5]}/>
          </div>
          <div className="row">
            <Block onClick={() => handleBlockClick(6)} value={state[6]}/>
            <Block onClick={() => handleBlockClick(7)} value={state[7]}/>
            <Block onClick={() => handleBlockClick(8)} value={state[8]}/>
          </div>
        </div>
        <button onClick={resetGame} className='btn'>Reset</button>
      </div>
    </>
  );
}

export default App;
