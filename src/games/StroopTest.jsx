import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './StroopTest.css';

const colors = [
    { name: 'RED', hex: '#ef4444' },
    { name: 'BLUE', hex: '#3b82f6' },
    { name: 'GREEN', hex: '#10b981' },
    { name: 'YELLOW', hex: '#eab308' },
    { name: 'PURPLE', hex: '#a855f7' },
    { name: 'ORANGE', hex: '#f97316' }
];

const StroopTest = ({ onBack }) => {
    const [word, setWord] = useState('');
    const [wordColor, setWordColor] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(40);
    const [gameActive, setGameActive] = useState(false);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [totalAnswers, setTotalAnswers] = useState(0);

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
    }, [gameActive]);

    const generateChallenge = () => {
        const wordData = colors[Math.floor(Math.random() * colors.length)];
        const colorData = colors[Math.floor(Math.random() * colors.length)];

        setWord(wordData.name);
        setWordColor(colorData.hex);
    };

    const handleAnswer = (selectedColor) => {
        const isCorrect = selectedColor === wordColor;

        setTotalAnswers(totalAnswers + 1);
        if (isCorrect) {
            setScore(score + 10);
            setCorrectAnswers(correctAnswers + 1);
        }

        generateChallenge();
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(40);
        setGameActive(true);
        setCorrectAnswers(0);
        setTotalAnswers(0);
    };

    const getAccuracy = () => {
        if (totalAnswers === 0) return 0;
        return Math.round((correctAnswers / totalAnswers) * 100);
    };

    return (
        <GameLayout
            title="Stroop Test"
            onBack={onBack}
            score={score}
            timer={timeLeft}
            instructions="Click the COLOR of the word, NOT what the word says!"
        >
            <div className="stroop-container">
                {!gameActive && timeLeft === 40 && (
                    <div className="start-screen">
                        <button className="btn btn-primary start-btn" onClick={startGame}>
                            Start Test
                        </button>
                        <div className="explanation glass-card">
                            <h3>The Stroop Effect</h3>
                            <p>This tests your cognitive control!</p>
                            <p className="tip">For example: If you see <span style={{ color: '#3b82f6' }}>RED</span>, click BLUE!</p>
                        </div>
                    </div>
                )}

                {gameActive && (
                    <div className="stroop-game">
                        <div className="word-display glass-card">
                            <div className="stroop-word" style={{ color: wordColor }}>
                                {word}
                            </div>
                        </div>

                        <div className="color-buttons">
                            {colors.map((color) => (
                                <button
                                    key={color.name}
                                    className="color-btn"
                                    style={{ backgroundColor: color.hex }}
                                    onClick={() => handleAnswer(color.hex)}
                                >
                                    {color.name}
                                </button>
                            ))}
                        </div>

                        <div className="stats-inline">
                            Accuracy: {getAccuracy()}%
                        </div>
                    </div>
                )}

                {!gameActive && timeLeft === 0 && (
                    <div className="results glass-card fade-in">
                        <h2>Test Complete!</h2>
                        <div className="result-stats">
                            <div className="stat-row">
                                <span>Final Score:</span>
                                <span className="value">{score}</span>
                            </div>
                            <div className="stat-row">
                                <span>Accuracy:</span>
                                <span className="value">{getAccuracy()}%</span>
                            </div>
                            <div className="stat-row">
                                <span>Correct:</span>
                                <span className="value">{correctAnswers}/{totalAnswers}</span>
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={startGame}>
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default StroopTest;
