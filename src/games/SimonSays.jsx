import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './SimonSays.css';

const colors = [
    { id: 0, color: '#ef4444', name: 'red' },
    { id: 1, color: '#3b82f6', name: 'blue' },
    { id: 2, color: '#10b981', name: 'green' },
    { id: 3, color: '#eab308', name: 'yellow' }
];

const SimonSays = ({ onBack }) => {
    const [sequence, setSequence] = useState([]);
    const [playerSequence, setPlayerSequence] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);
    const [activeButton, setActiveButton] = useState(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [speed, setSpeed] = useState(600);

    const playSequence = async (seq) => {
        setIsPlaying(true);
        setIsPlayerTurn(false);

        for (let i = 0; i < seq.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 200));
            setActiveButton(seq[i]);
            await new Promise(resolve => setTimeout(resolve, speed));
            setActiveButton(null);
        }

        setIsPlaying(false);
        setIsPlayerTurn(true);
    };

    const startGame = () => {
        const firstMove = Math.floor(Math.random() * 4);
        const newSequence = [firstMove];
        setSequence(newSequence);
        setPlayerSequence([]);
        setScore(0);
        setGameOver(false);
        setSpeed(600);
        playSequence(newSequence);
    };

    const handleButtonClick = (colorId) => {
        if (!isPlayerTurn || isPlaying) return;

        const newPlayerSequence = [...playerSequence, colorId];
        setPlayerSequence(newPlayerSequence);

        // Flash the button
        setActiveButton(colorId);
        setTimeout(() => setActiveButton(null), 300);

        // Check if correct
        if (colorId !== sequence[newPlayerSequence.length - 1]) {
            setGameOver(true);
            setIsPlayerTurn(false);
            return;
        }

        // Player completed the sequence correctly
        if (newPlayerSequence.length === sequence.length) {
            setScore(score + 1);
            const nextMove = Math.floor(Math.random() * 4);
            const newSequence = [...sequence, nextMove];

            setTimeout(() => {
                setSequence(newSequence);
                setPlayerSequence([]);
                // Speed up every 5 rounds
                if ((score + 1) % 5 === 0 && speed > 300) {
                    setSpeed(speed - 100);
                }
                playSequence(newSequence);
            }, 1000);
        }
    };

    return (
        <GameLayout
            title="Simon Says"
            onBack={onBack}
            score={score}
            instructions="Watch the pattern and repeat it! The sequence gets longer each round."
        >
            <div className="simon-container">
                {gameOver && (
                    <div className="game-over-message glass-card fade-in">
                        <h2>Game Over!</h2>
                        <p className="final-score">Final Score: {score}</p>
                        <p className="sequence-length">Sequence Length: {sequence.length}</p>
                        <button className="btn btn-primary" onClick={startGame}>
                            Play Again
                        </button>
                    </div>
                )}

                {!isPlaying && !isPlayerTurn && !gameOver && (
                    <div className="start-container">
                        <button className="btn btn-primary start-btn" onClick={startGame}>
                            Start Game
                        </button>
                        <p className="instructions-text">
                            Watch the pattern of lights, then repeat it by clicking the buttons in the same order
                        </p>
                    </div>
                )}

                {isPlayerTurn && (
                    <div className="turn-indicator fade-in">
                        Your Turn! ({playerSequence.length}/{sequence.length})
                    </div>
                )}

                {isPlaying && (
                    <div className="turn-indicator fade-in">
                        Watch carefully...
                    </div>
                )}

                <div className="simon-board">
                    {colors.map((colorItem) => (
                        <div
                            key={colorItem.id}
                            className={`simon-button ${activeButton === colorItem.id ? 'active' : ''}`}
                            style={{ backgroundColor: colorItem.color }}
                            onClick={() => handleButtonClick(colorItem.id)}
                        ></div>
                    ))}
                </div>

                {score > 0 && (
                    <div className="game-stats">
                        <div className="stat-item">
                            Speed: {speed}ms
                        </div>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default SimonSays;
