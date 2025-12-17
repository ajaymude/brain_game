import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './Sudoku.css';

const Sudoku = ({ onBack }) => {
    const [board, setBoard] = useState([]);
    const [solution, setSolution] = useState([]);
    const [selected, setSelected] = useState(null);
    const [mistakes, setMistakes] = useState(0);
    const [completed, setCompleted] = useState(false);
    const [difficulty, setDifficulty] = useState('easy');

    const difficulties = {
        easy: 35,
        medium: 45,
        hard: 55
    };

    useEffect(() => {
        generatePuzzle(difficulty);
    }, [difficulty]);

    const generatePuzzle = (diff) => {
        // Generate a solved sudoku board
        const solved = generateSolvedBoard();
        setSolution(solved);

        // Remove cells based on difficulty
        const puzzle = JSON.parse(JSON.stringify(solved));
        const cellsToRemove = difficulties[diff];
        let removed = 0;

        while (removed < cellsToRemove) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            if (puzzle[row][col] !== 0) {
                puzzle[row][col] = 0;
                removed++;
            }
        }

        setBoard(puzzle);
        setMistakes(0);
        setCompleted(false);
        setSelected(null);
    };

    const generateSolvedBoard = () => {
        const board = Array(9).fill(null).map(() => Array(9).fill(0));
        fillBoard(board);
        return board;
    };

    const fillBoard = (board) => {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    const shuffled = numbers.sort(() => Math.random() - 0.5);

                    for (let num of shuffled) {
                        if (isValid(board, row, col, num)) {
                            board[row][col] = num;

                            if (fillBoard(board)) {
                                return true;
                            }

                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };

    const isValid = (board, row, col, num) => {
        // Check row
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) return false;
        }

        // Check column
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === num) return false;
        }

        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[boxRow + i][boxCol + j] === num) return false;
            }
        }

        return true;
    };

    const handleCellClick = (row, col) => {
        if (solution[row][col] !== 0 && board[row][col] !== 0) return;
        setSelected({ row, col });
    };

    const handleNumberClick = (num) => {
        if (!selected || completed) return;

        const { row, col } = selected;
        const newBoard = board.map(r => [...r]);

        if (num === solution[row][col]) {
            newBoard[row][col] = num;
            setBoard(newBoard);

            // Check if completed
            if (isBoardComplete(newBoard)) {
                setCompleted(true);
            }
        } else {
            setMistakes(mistakes + 1);
        }
    };

    const isBoardComplete = (board) => {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (board[i][j] === 0) return false;
            }
        }
        return true;
    };

    const initialBoard = JSON.parse(JSON.stringify(solution)).map((row, i) =>
        row.map((cell, j) => board[i][j] === 0 ? 0 : cell)
    );

    return (
        <GameLayout
            title="Sudoku"
            onBack={onBack}
            score={Math.max(0, 100 - mistakes * 5)}
            instructions="Fill the grid so each row, column, and 3×3 box contains digits 1-9."
        >
            <div className="sudoku-container">
                {completed && (
                    <div className="win-message glass-card fade-in">
                        <h2>🎉 Puzzle Solved!</h2>
                        <p>Mistakes: {mistakes}</p>
                        <p>Score: {Math.max(0, 100 - mistakes * 5)}</p>
                        <button className="btn btn-primary" onClick={() => generatePuzzle(difficulty)}>
                            New Puzzle
                        </button>
                    </div>
                )}

                <div className="difficulty-selector">
                    {['easy', 'medium', 'hard'].map(diff => (
                        <button
                            key={diff}
                            className={`btn ${difficulty === diff ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setDifficulty(diff)}
                        >
                            {diff.charAt(0).toUpperCase() + diff.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="sudoku-board">
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex} className="sudoku-row">
                            {row.map((cell, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={`sudoku-cell ${selected?.row === rowIndex && selected?.col === colIndex ? 'selected' : ''
                                        } ${initialBoard[rowIndex][colIndex] !== 0 ? 'fixed' : ''}`}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                >
                                    {cell !== 0 ? cell : ''}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="number-pad">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <button
                            key={num}
                            className="btn btn-secondary number-btn"
                            onClick={() => handleNumberClick(num)}
                        >
                            {num}
                        </button>
                    ))}
                </div>

                <div className="game-stats">
                    <div className="stat">Mistakes: {mistakes}</div>
                </div>
            </div>
        </GameLayout>
    );
};

export default Sudoku;
