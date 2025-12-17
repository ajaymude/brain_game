import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './DualNBack.css';

const DualNBack = ({ onBack }) => {
    const [n, setN] = useState(2);
    const [sequence, setSequence] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [positionMatches, setPositionMatches] = useState([]);
    const [gameActive, setGameActive] = useState(false);
    const [round, setRound] = useState(0);

    const colors = ['#ef4444', '#3b82f6', '#10b981', '#eab308'];

    const generateSequence = () => {
        const seq = [];
        for (let i = 0; i < 20; i++) {
            seq.push({
                position: Math.floor(Math.random() * 9),
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
        return seq;
    };

    const startGame = () => {
        const seq = generateSequence();
        setSequence(seq);
        setCurrentIndex(0);
        setGameActive(true);
        setPositionMatches([]);
        playSequence(seq);
    };

    const playSequence = async (seq) => {
        for (let i = 0; i < seq.length; i++) {
            setCurrentIndex(i);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        setGameActive(false);
        endGame();
    };

    const handleMatch = (type) => {
        if (currentIndex < n) return;

        const current = sequence[currentIndex];
        const nBack = sequence[currentIndex - n];

        const isMatch = type === 'position'
            ? current.position === nBack.position
            : current.color === nBack.color;

        if (isMatch) {
            setScore(score + 10);
            setPositionMatches([...positionMatches, currentIndex]);
        }
    };

    const endGame = () => {
        setRound(round + 1);
    };

    return (
        <GameLayout
            title="Dual N-Back"
            onBack={onBack}
            score={score}
            instructions={`Remember position & color from ${n} steps back!`}
        >
            <div className="dual-nback-container">
                {!gameActive && round === 0 ? (
                    <div className="start-screen">
                        <div className="n-selector">
                            <label>N-Back Level:</label>
                            {[2, 3].map(level => (
                                <button
                                    key={level}
                                    className={`btn ${n === level ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => setN(level)}
                                >
                                    {level}-Back
                                </button>
                            ))}
                        </div>
                        <button className="btn btn-primary start-btn" onClick={startGame}>
                            Start Game
                        </button>
                    </div>
                ) : gameActive ? (
                    <>
                        <div className="progress">Step {currentIndex + 1} / 20</div>
                        <div className="nback-grid">
                            {Array.from({ length: 9 }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`grid-cell ${sequence[currentIndex]?.position === idx ? 'active' : ''}`}
                                    style={{
                                        backgroundColor: sequence[currentIndex]?.position === idx
                                            ? sequence[currentIndex].color
                                            : 'transparent'
                                    }}
                                ></div>
                            ))}
                        </div>
                        <div className="response-buttons">
                            <button className="btn btn-primary" onClick={() => handleMatch('position')}>
                                Position Match
                            </button>
                            <button className="btn btn-primary" onClick={() => handleMatch('color')}>
                                Color Match
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="result glass-card">
                        <h2>Game Complete!</h2>
                        <p>Score: {score}</p>
                        <button className="btn btn-primary" onClick={startGame}>
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default DualNBack;
