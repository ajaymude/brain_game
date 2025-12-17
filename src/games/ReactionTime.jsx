import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './ReactionTime.css';

const ReactionTime = ({ onBack }) => {
    const [gameState, setGameState] = useState('idle'); // idle, waiting, ready, clicked
    const [startTime, setStartTime] = useState(null);
    const [reactionTime, setReactionTime] = useState(null);
    const [attempts, setAttempts] = useState([]);
    const [bestTime, setBestTime] = useState(null);

    useEffect(() => {
        if (gameState === 'waiting') {
            const randomDelay = Math.random() * 4000 + 1000; // 1-5 seconds
            const timer = setTimeout(() => {
                setGameState('ready');
                setStartTime(Date.now());
            }, randomDelay);

            return () => clearTimeout(timer);
        }
    }, [gameState]);

    const startGame = () => {
        setGameState('waiting');
        setReactionTime(null);
    };

    const handleClick = () => {
        if (gameState === 'waiting') {
            setGameState('idle');
            setReactionTime('Too early! Wait for green.');
        } else if (gameState === 'ready') {
            const endTime = Date.now();
            const reaction = endTime - startTime;
            setReactionTime(reaction);
            setGameState('clicked');

            const newAttempts = [...attempts, reaction];
            setAttempts(newAttempts);

            if (!bestTime || reaction < bestTime) {
                setBestTime(reaction);
            }
        }
    };

    const getAverageTime = () => {
        if (attempts.length === 0) return 0;
        return Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length);
    };

    const getReactionRating = (time) => {
        if (time < 200) return '🚀 Lightning Fast!';
        if (time < 250) return '⚡ Excellent!';
        if (time < 300) return '👍 Great!';
        if (time < 400) return '👌 Good';
        return '🐌 Keep Practicing';
    };

    const resetStats = () => {
        setAttempts([]);
        setBestTime(null);
        setReactionTime(null);
        setGameState('idle');
    };

    return (
        <GameLayout
            title="Reaction Time Test"
            onBack={onBack}
            score={attempts.length}
            instructions="Click as fast as you can when the screen turns green!"
        >
            <div className="reaction-container">
                <div className="stats-panel">
                    <div className="stat-box">
                        <div className="stat-label">Best Time</div>
                        <div className="stat-value">{bestTime ? `${bestTime}ms` : '-'}</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-label">Average</div>
                        <div className="stat-value">{attempts.length > 0 ? `${getAverageTime()}ms` : '-'}</div>
                    </div>
                    <div className="stat-box">
                        <div className="stat-label">Attempts</div>
                        <div className="stat-value">{attempts.length}</div>
                    </div>
                </div>

                <div
                    className={`reaction-area glass-card ${gameState}`}
                    onClick={handleClick}
                >
                    {gameState === 'idle' && (
                        <div className="reaction-message">
                            <h2>Click to Start</h2>
                            <p>Wait for green, then click as fast as you can!</p>
                        </div>
                    )}

                    {gameState === 'waiting' && (
                        <div className="reaction-message">
                            <h2>Wait...</h2>
                            <p>Get ready!</p>
                        </div>
                    )}

                    {gameState === 'ready' && (
                        <div className="reaction-message">
                            <h2>CLICK NOW!</h2>
                        </div>
                    )}

                    {gameState === 'clicked' && (
                        <div className="reaction-message">
                            <h2>{typeof reactionTime === 'number' ? `${reactionTime}ms` : reactionTime}</h2>
                            {typeof reactionTime === 'number' && (
                                <p className="rating">{getReactionRating(reactionTime)}</p>
                            )}
                            <button className="btn btn-primary" onClick={startGame}>
                                Try Again
                            </button>
                        </div>
                    )}
                </div>

                {attempts.length > 0 && (
                    <div className="attempts-history">
                        <h3>Recent Attempts</h3>
                        <div className="attempts-list">
                            {attempts.slice(-5).reverse().map((time, idx) => (
                                <div key={idx} className="attempt-item">
                                    {time}ms
                                </div>
                            ))}
                        </div>
                        <button className="btn btn-secondary" onClick={resetStats}>
                            Reset Stats
                        </button>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default ReactionTime;
