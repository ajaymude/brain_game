import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './VisualSearch.css';

const VisualSearch = ({ onBack }) => {
    const [target, setTarget] = useState('');
    const [grid, setGrid] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(45);
    const [gameOver, setGameOver] = useState(false);
    const [round, setRound] = useState(0);
    const [gridSize, setGridSize] = useState(6); // 6x6 grid

    const symbols = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '⭐', '❤️', '💎', '🔶', '🔷', '🔺', '⚡', '🎯', '🎨', '🎪'];

    useEffect(() => {
        generateRound();
    }, []);

    useEffect(() => {
        if (timeLeft > 0 && !gameOver) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setGameOver(true);
        }
    }, [timeLeft, gameOver]);

    const generateRound = () => {
        const totalCells = gridSize * gridSize;
        const targetSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        let otherSymbol;
        do {
            otherSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        } while (otherSymbol === targetSymbol);

        // Create grid with mostly other symbols and a few target symbols (2-4)
        const targetCount = Math.floor(Math.random() * 3) + 2; // 2-4 targets
        const newGrid = Array(totalCells).fill(otherSymbol);

        // Place target symbols randomly
        const targetPositions = [];
        while (targetPositions.length < targetCount) {
            const pos = Math.floor(Math.random() * totalCells);
            if (!targetPositions.includes(pos)) {
                targetPositions.push(pos);
                newGrid[pos] = targetSymbol;
            }
        }

        setTarget(targetSymbol);
        setGrid(newGrid);
        setRound(round + 1);
    };

    const handleCellClick = (index) => {
        if (gameOver) return;

        if (grid[index] === target) {
            setScore(score + 10);
            const newGrid = [...grid];
            newGrid[index] = '✓';
            setGrid(newGrid);

            // Check if all targets found
            if (!newGrid.some(cell => cell === target)) {
                setTimeout(() => {
                    // Increase difficulty
                    if (round % 3 === 0 && gridSize < 10) {
                        setGridSize(gridSize + 1);
                    }
                    generateRound();
                }, 500);
            }
        } else if (grid[index] !== '✓') {
            setScore(Math.max(0, score - 2));
        }
    };

    const resetGame = () => {
        setScore(0);
        setTimeLeft(45);
        setGameOver(false);
        setRound(0);
        setGridSize(6);
        generateRound();
    };

    return (
        <GameLayout
            title="Visual Search"
            onBack={onBack}
            score={score}
            timer={timeLeft}
            instructions="Find all instances of the target symbol as fast as you can!"
        >
            <div className="visual-search-container">
                {gameOver ? (
                    <div className="game-over-message glass-card fade-in">
                        <h2>⏱️ Time's Up!</h2>
                        <p className="final-score">Final Score: {score}</p>
                        <p className="rounds-completed">Rounds Completed: {round}</p>
                        <button className="btn btn-primary" onClick={resetGame}>
                            Play Again
                        </button>
                    </div>
                ) : (
                    <div className="search-game">
                        <div className="target-display glass-card">
                            <div className="target-label">Find:</div>
                            <div className="target-symbol">{target}</div>
                        </div>

                        <div className="search-grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
                            {grid.map((symbol, index) => (
                                <div
                                    key={index}
                                    className={`search-cell ${symbol === '✓' ? 'found' : ''}`}
                                    onClick={() => handleCellClick(index)}
                                >
                                    {symbol}
                                </div>
                            ))}
                        </div>

                        <div className="round-info">
                            Round {round} | Grid: {gridSize}×{gridSize}
                        </div>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default VisualSearch;
