import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './GoNoGo.css';

const GoNoGo = ({ onBack }) => {
    const [currentSignal, setCurrentSignal] = useState(null);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);
    const [totalRounds] = useState(30);
    const [gameActive, setGameActive] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [correctResponses, setCorrectResponses] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [speed, setSpeed] = useState(1500);

    const signals = [
        { type: 'go', symbol: '🟢', action: 'Press SPACE' },
        { type: 'nogo', symbol: '🔴', action: 'Don\'t Press!' }
    ];

    useEffect(() => {
        if (gameActive && round < totalRounds) {
            const timer = setTimeout(() => {
                showNextSignal();
            }, speed);

            return () => clearTimeout(timer);
        } else if (round >= totalRounds) {
            setGameActive(false);
        }
    }, [round, gameActive]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.code === 'Space' && gameActive && currentSignal) {
                e.preventDefault();
                handleResponse('go');
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameActive, currentSignal]);

    const showNextSignal = () => {
        // 70% go, 30% no-go
        const isGo = Math.random() < 0.7;
        const signal = isGo ? signals[0] : signals[1];

        setCurrentSignal(signal);
        setRound(round + 1);

        // Auto-advance after display time
        setTimeout(() => {
            if (signal.type === 'nogo') {
                // If no-go and no response, that's correct
                handleResponse('nogo-correct');
            }
            setCurrentSignal(null);
        }, 800);
    };

    const handleResponse = (responseType) => {
        if (!currentSignal) return;

        const isCorrect =
            (currentSignal.type === 'go' && responseType === 'go') ||
            (currentSignal.type === 'nogo' && responseType === 'nogo-correct');

        if (isCorrect) {
            setScore(score + 10);
            setCorrectResponses(correctResponses + 1);
            setFeedback('✅');
        } else {
            setScore(Math.max(0, score - 5));
            setMistakes(mistakes + 1);
            setFeedback('❌');
        }

        setTimeout(() => setFeedback(''), 300);

        // Speed up every 10 rounds
        if ((round + 1) % 10 === 0 && speed > 800) {
            setSpeed(speed - 200);
        }
    };

    const startGame = () => {
        setScore(0);
        setRound(0);
        setGameActive(true);
        setCorrectResponses(0);
        setMistakes(0);
        setSpeed(1500);
        setCurrentSignal(null);
        setFeedback('');
    };

    const getAccuracy = () => {
        if (round === 0) return 0;
        return Math.round((correctResponses / round) * 100);
    };

    return (
        <GameLayout
            title="Go / No-Go Task"
            onBack={onBack}
            score={score}
            instructions="Press SPACE when you see GREEN. Don't press for RED!"
        >
            <div className="gono-container">
                {!gameActive && round === 0 && (
                    <div className="start-screen">
                        <button className="btn btn-primary start-btn" onClick={startGame}>
                            Start Test
                        </button>
                        <div className="instructions-box glass-card">
                            <h3>Instructions:</h3>
                            <p>• Press <kbd>SPACE</kbd> when you see 🟢</p>
                            <p>• Do NOT press when you see 🔴</p>
                            <p>• React as fast as you can!</p>
                        </div>
                    </div>
                )}

                {gameActive && (
                    <div className="game-area">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${(round / totalRounds) * 100}%` }}></div>
                        </div>

                        <div className="round-info">
                            Round {round} / {totalRounds}
                        </div>

                        <div className={`signal-display ${currentSignal ? 'active' : ''}`}>
                            {currentSignal && (
                                <div className="signal fade-in">
                                    {currentSignal.symbol}
                                </div>
                            )}
                            {feedback && (
                                <div className="response-feedback">{feedback}</div>
                            )}
                        </div>

                        <div className="game-stats-inline">
                            <div className="stat-item">
                                Accuracy: {getAccuracy()}%
                            </div>
                            <div className="stat-item">
                                Speed: {(1500 / speed).toFixed(1)}x
                            </div>
                        </div>
                    </div>
                )}

                {!gameActive && round >= totalRounds && (
                    <div className="results glass-card fade-in">
                        <h2>Test Complete!</h2>
                        <div className="results-stats">
                            <div className="result-row">
                                <span>Final Score:</span>
                                <span className="result-value">{score}</span>
                            </div>
                            <div className="result-row">
                                <span>Accuracy:</span>
                                <span className="result-value">{getAccuracy()}%</span>
                            </div>
                            <div className="result-row">
                                <span>Correct:</span>
                                <span className="result-value">{correctResponses}/{totalRounds}</span>
                            </div>
                            <div className="result-row">
                                <span>Mistakes:</span>
                                <span className="result-value">{mistakes}</span>
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

export default GoNoGo;
