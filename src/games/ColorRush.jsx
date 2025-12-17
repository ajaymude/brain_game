import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './ColorRush.css';

const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Cyan'];
const colorValues = {
    Red: '#ef4444',
    Blue: '#3b82f6',
    Green: '#10b981',
    Yellow: '#eab308',
    Purple: '#a855f7',
    Orange: '#f97316',
    Pink: '#ec4899',
    Cyan: '#06b6d4',
};

const ColorRush = ({ onBack }) => {
    const [currentWord, setCurrentWord] = useState('');
    const [currentColor, setCurrentColor] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameOver, setGameOver] = useState(false);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        generateNewChallenge();
    }, []);

    useEffect(() => {
        if (timeLeft > 0 && !gameOver) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setGameOver(true);
        }
    }, [timeLeft, gameOver]);

    const generateNewChallenge = () => {
        const word = colors[Math.floor(Math.random() * colors.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        setCurrentWord(word);
        setCurrentColor(color);
    };

    const handleAnswer = (isMatch) => {
        const correct = (currentWord === currentColor) === isMatch;

        if (correct) {
            setScore(score + 10 + streak);
            setStreak(streak + 1);
        } else {
            setStreak(0);
        }

        generateNewChallenge();
    };

    const resetGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameOver(false);
        setStreak(0);
        generateNewChallenge();
    };

    return (
        <GameLayout
            title="Color Rush"
            onBack={onBack}
            score={score}
            timer={timeLeft}
            instructions="Does the word match the color? Quick! Press YES or NO!"
        >
            <div className="color-rush-container">
                {gameOver ? (
                    <div className="game-over-message glass-card fade-in">
                        <h2>⏱️ Time's Up!</h2>
                        <p className="final-score">Final Score: {score}</p>
                        <p className="best-streak">Best Streak: {streak}</p>
                        <button className="btn btn-primary" onClick={resetGame}>
                            Play Again
                        </button>
                    </div>
                ) : (
                    <div className="color-challenge">
                        <div className="color-display glass-card">
                            <div
                                className="color-word"
                                style={{ color: colorValues[currentColor] }}
                            >
                                {currentWord}
                            </div>
                        </div>

                        {streak > 2 && (
                            <div className="streak-indicator fade-in">
                                🔥 {streak} Streak!
                            </div>
                        )}

                        <div className="answer-buttons">
                            <button
                                className="btn answer-btn yes-btn"
                                onClick={() => handleAnswer(true)}
                            >
                                ✓ YES
                            </button>
                            <button
                                className="btn answer-btn no-btn"
                                onClick={() => handleAnswer(false)}
                            >
                                ✗ NO
                            </button>
                        </div>

                        <div className="game-tip">
                            Click YES if the word matches the color, NO if it doesn't!
                        </div>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default ColorRush;
