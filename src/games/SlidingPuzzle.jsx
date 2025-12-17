import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './SlidingPuzzle.css';

const SlidingPuzzle = ({ onBack }) => {
    const [size, setSize] = useState(3); // 3x3 puzzle
    const [tiles, setTiles] = useState([]);
    const [moves, setMoves] = useState(0);
    const [isSolved, setIsSolved] = useState(false);
    const [emptyIndex, setEmptyIndex] = useState(8);

    useEffect(() => {
        initializePuzzle();
    }, [size]);

    const initializePuzzle = () => {
        const totalTiles = size * size;
        let shuffled;

        do {
            shuffled = Array.from({ length: totalTiles - 1 }, (_, i) => i + 1);
            shuffled.push(0); // 0 represents empty space

            // Fisher-Yates shuffle
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
        } while (!isSolvable(shuffled) || isPuzzleSolved(shuffled));

        setTiles(shuffled);
        setEmptyIndex(shuffled.indexOf(0));
        setMoves(0);
        setIsSolved(false);
    };

    const isSolvable = (arr) => {
        let inversions = 0;
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[i] && arr[j] && arr[i] > arr[j]) {
                    inversions++;
                }
            }
        }

        if (size % 2 === 1) {
            return inversions % 2 === 0;
        } else {
            const emptyRow = Math.floor(arr.indexOf(0) / size);
            return (inversions + emptyRow) % 2 === 1;
        }
    };

    const isPuzzleSolved = (arr) => {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] !== i + 1) return false;
        }
        return arr[arr.length - 1] === 0;
    };

    const canMove = (index) => {
        const row = Math.floor(index / size);
        const col = index % size;
        const emptyRow = Math.floor(emptyIndex / size);
        const emptyCol = emptyIndex % size;

        return (
            (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
            (col === emptyCol && Math.abs(row - emptyRow) === 1)
        );
    };

    const moveTile = (index) => {
        if (!canMove(index) || isSolved) return;

        const newTiles = [...tiles];
        [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];

        setTiles(newTiles);
        setEmptyIndex(index);
        setMoves(moves + 1);

        if (isPuzzleSolved(newTiles)) {
            setIsSolved(true);
        }
    };

    const changeDifficulty = (newSize) => {
        setSize(newSize);
    };

    return (
        <GameLayout
            title="Sliding Puzzle"
            onBack={onBack}
            score={moves}
            instructions="Arrange the tiles in order by sliding them into the empty space."
        >
            <div className="sliding-puzzle-container">
                {isSolved && (
                    <div className="win-message glass-card fade-in">
                        <h2>🎉 Puzzle Solved!</h2>
                        <p>Completed in {moves} moves!</p>
                        <button className="btn btn-primary" onClick={initializePuzzle}>
                            Play Again
                        </button>
                    </div>
                )}

                <div className="puzzle-controls">
                    <label>Grid Size: </label>
                    {[3, 4, 5].map(n => (
                        <button
                            key={n}
                            className={`btn ${size === n ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => changeDifficulty(n)}
                        >
                            {n}×{n}
                        </button>
                    ))}
                </div>

                <div className="puzzle-grid" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                    {tiles.map((tile, index) => (
                        <div
                            key={index}
                            className={`puzzle-tile ${tile === 0 ? 'empty' : ''} ${canMove(index) ? 'movable' : ''}`}
                            onClick={() => moveTile(index)}
                        >
                            {tile !== 0 && tile}
                        </div>
                    ))}
                </div>

                <button className="btn btn-secondary reset-btn" onClick={initializePuzzle}>
                    🔄 Shuffle
                </button>
            </div>
        </GameLayout>
    );
};

export default SlidingPuzzle;
