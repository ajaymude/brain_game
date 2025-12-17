import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './ColorMatching.css';

const colors = [
    { name: 'Red', hex: '#ef4444' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Green', hex: '#10b981' },
    { name: 'Yellow', hex: '#eab308' },
    { name: 'Purple', hex: '#a855f7' }
];

const ColorMatching = ({ onBack }) => {
    const [targetColor, setTargetColor] = useState('');
    const [distractors, setDistractors] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameActive, setGameActive] = useState(false);
    const [found, setFound] = useState(0);

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
            generateChallenge();
        }
    }, [gameActive, found]);

    const generateChallenge = () => {
        const target = colors[Math.floor(Math.random() * colors.length)];
        const grid = Array(16).fill(null).map(() =>
            colors[Math.floor(Math.random() * colors.length)]
        );
        // Ensure at least one target
        grid[Math.floor(Math.random() * 16)] = target;

        setTargetColor(target);
        setDistractors(grid);
    };

    const handleClick = (idx) => {
        if (distractors[idx].name === targetColor.name) {
            setScore(score + 5);
            setFound(found + 1);
        }
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameActive(true);
        setFound(0);
    };

    return (
        <GameLayout
            title="Color Matching"
            onBack={onBack}
            score={score}
            timer={timeLeft}
            instructions="Click all instances of the target color!"
        >
            <div className="color-matching-container">
                {!gameActive ? (
                    <div className="start-screen">
                        <button className="btn btn-primary start-btn" onClick={startGame}>
                            Start Game
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="target-display glass-card">
                            <span>Find:</span>
                            <div className="target-color" style={{ backgroundColor: targetColor.hex }}>
                                {targetColor.name}
                            </div>
                        </div>

                        <div className="color-grid">
                            {distractors.map((color, idx) => (
                                <div
                                    key={idx}
                                    className="color-box"
                                    style={{ backgroundColor: color.hex }}
                                    onClick={() => handleClick(idx)}
                                ></div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </GameLayout>
    );
};

export default ColorMatching;
