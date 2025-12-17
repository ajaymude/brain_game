import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './SpeedClick.css';

const SpeedClick = ({ onBack }) => {
    const [target, setTarget] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(15);
    const [gameActive, setGameActive] = useState(false);
    const [clicks, setClicks] = useState(0);

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
            moveTarget();
        }
    }, [gameActive, clicks]);

    const moveTarget = () => {
        const x = Math.random() * 80;
        const y = Math.random() * 70;
        setTarget({ x, y });
    };

    const handleClick = () => {
        setScore(score + 1);
        setClicks(clicks + 1);
        moveTarget();
    };

    const startGame = () => {
        setScore(0);
        setTimeLeft(15);
        setGameActive(true);
        setClicks(0);
        moveTarget();
    };

    const getCPS = () => {
        return (clicks / (15 - timeLeft) || 0).toFixed(1);
    };

    return (
        <GameLayout
            title="Speed Click"
            onBack={onBack}
            score={score}
            timer={gameActive ? timeLeft : null}
            instructions="Click the target as fast as you can!"
        >
            <div className="speed-click-container">
                {!gameActive ? (
                    <div className="start-screen">
                        <button className="btn btn-primary start-btn" onClick={startGame}>
                            Start Game
                        </button>
                        {score > 0 && <div className="final-stats">Final Score: {score} clicks | {getCPS()} clicks/sec</div>}
                    </div>
                ) : (
                    <div className="game-area">
                        {target && (
                            <div
                                className="click-target"
                                style={{ left: `${target.x}%`, top: `${target.y}%` }}
                                onClick={handleClick}
                            >
                                🎯
                            </div>
                        )}
                        <div className="live-stats">CPS: {getCPS()}</div>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default SpeedClick;
