import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './ProgressiveMemory.css';

const ProgressiveMemory = ({ onBack }) => {
    const [gridSize, setGridSize] = useState(2); // Start with 2x2
    const [sequence, setSequence] = useState([]);
    const [playerSequence, setPlayerSequence] = useState([]);
    const [isShowingSequence, setIsShowingSequence] = useState(false);
    const [activeCell, setActiveCell] = useState(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [round, setRound] = useState(0);

    const emojis = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '⭐', '❤️'];

    const generateSequence = (size, length) => {
        const totalCells = size * size;
        const seq = [];
        for (let i = 0; i < length; i++) {
            seq.push(Math.floor(Math.random() * totalCells));
        }
        return seq;
    };

    const startRound = () => {
        const sequenceLength = Math.min(3 + round, gridSize * gridSize - 1);
        const newSequence = generateSequence(gridSize, sequenceLength);
        setSequence(newSequence);
        setPlayerSequence([]);
        showSequence(newSequence);
    };

    const showSequence = async (seq) => {
        setIsShowingSequence(true);

        for (let i = 0; i < seq.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 500));
            setActiveCell(seq[i]);
            await new Promise(resolve => setTimeout(resolve, 800));
            setActiveCell(null);
        }

        setIsShowingSequence(false);
    };

    const handleCellClick = (index) => {
        if (isShowingSequence || gameOver) return;

        const newPlayerSequence = [...playerSequence, index];
        setPlayerSequence(newPlayerSequence);

        // Flash cell
        setActiveCell(index);
        setTimeout(() => setActiveCell(null), 200);

        // Check if correct
        if (index !== sequence[newPlayerSequence.length - 1]) {
            setGameOver(true);
            return;
        }

        // Check if sequence completed
        if (newPlayerSequence.length === sequence.length) {
            setScore(score + gridSize * 10);
            setRound(round + 1);

            setTimeout(() => {
                // Increase grid size every 2 successful rounds
                if ((round + 1) % 2 === 0 && gridSize < 8) {
                    setGridSize(gridSize + 1);
                }
                startRound();
            }, 1000);
        }
    };

    const startGame = () => {
        setGridSize(2);
        setScore(0);
        setGameOver(false);
        setRound(0);
        startRound();
    };

    useEffect(() => {
        if (round === 0 && !gameOver) {
            startRound();
        }
    }, []);

    return (
        <GameLayout
            title="Progressive Grid Memory"
            onBack={onBack}
            score={score}
            instructions="Watch the sequence and repeat it! Grid gets bigger as you progress."
        >
            <div className="progressive-memory-container">
                {gameOver && (
                    <div className="game-over-message glass-card fade-in">
                        <h2>Game Over!</h2>
                        <p className="final-score">Final Score: {score}</p>
                        <p className="grid-reached">Largest Grid: {gridSize}×{gridSize}</p>
                        <p className="rounds-completed">Rounds: {round}</p>
                        <button className="btn btn-primary" onClick={startGame}>
                            Play Again
                        </button>
                    </div>
                )}

                {!isShowingSequence && !gameOver && playerSequence.length < sequence.length && sequence.length > 0 && (
                    <div className="turn-indicator fade-in">
                        Your Turn! ({playerSequence.length}/{sequence.length})
                    </div>
                )}

                {isShowingSequence && (
                    <div className="turn-indicator fade-in">
                        Watch carefully...
                    </div>
                )}

                <div className="memory-grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
                    {Array.from({ length: gridSize * gridSize }).map((_, index) => (
                        <div
                            key={index}
                            className={`memory-cell ${activeCell === index ? 'active' : ''}`}
                            onClick={() => handleCellClick(index)}
                        >
                            {emojis[index % emojis.length]}
                        </div>
                    ))}
                </div>

                <div className="game-info">
                    Round {round + 1} | Grid: {gridSize}×{gridSize} | Sequence: {sequence.length}
                </div>
            </div>
        </GameLayout>
    );
};

export default ProgressiveMemory;
