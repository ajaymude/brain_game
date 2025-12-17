import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './WhackAMole.css';

const WhackAMole = ({ onBack }) => {
    const [moles, setMoles] = useState(Array(9).fill(false));
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameActive, setGameActive] = useState(false);
    const [speed, setSpeed] = useState(1000);

    useEffect(() => {
        if (gameActive && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setGameActive(false);
        }
    }, [timeLeft, gameActive]);

    useEffect(() => {
        if (gameActive) {
            const interval = setInterval(() => {
                const newMoles = Array(9).fill(false);
                const randomIndex = Math.floor(Math.random() * 9);
                newMoles[randomIndex] = true;
                setMoles(newMoles);
            }, speed);

            return () => clearInterval(interval);
        }
    }, [gameActive, speed]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameActive(true);
        setSpeed(1000);
        setMoles(Array(9).fill(false));
    };

    const handleWhack = (index) => {
        if (!gameActive || !moles[index]) return;

        setScore(score + 1);
        const newMoles = [...moles];
        newMoles[index] = false;
        setMoles(newMoles);

        // Speed up every 5 hits
        if ((score + 1) % 5 === 0 && speed > 400) {
            setSpeed(speed - 100);
        }
    };

    return (
        <GameLayout
            title="Whack-a-Mole"
            onBack={onBack}
            score={score}
            timer={timeLeft}
            instructions="Click the moles as fast as you can!"
        >
            <div className="whack-container">
                {!gameActive && timeLeft === 30 && (
                    <div className="start-screen">
                        <button className="btn btn-primary start-btn" onClick={startGame}>
                            Start Game
                        </button>
                        <p className="game-info">Click the shapes as they appear. They get faster!</p>
                    </div>
                )}

                {!gameActive && timeLeft === 0 && (
                    <div className="game-over-message glass-card fade-in">
                        <h2>⏱️ Time's Up!</h2>
                        <p className="final-score">Final Score: {score}</p>
                        <button className="btn btn-primary" onClick={startGame}>
                            Play Again
                        </button>
                    </div>
                )}

                <div className="mole-grid">
                    {moles.map((isActive, index) => (
                        <div
                            key={index}
                            className={`mole-hole ${isActive ? 'active' : ''}`}
                            onClick={() => handleWhack(index)}
                        >
                            {isActive && <div className="mole">🎯</div>}
                        </div>
                    ))}
                </div>

                {gameActive && (
                    <div className="speed-indicator">
                        Speed: {(1000 / speed).toFixed(1)}x
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default WhackAMole;
