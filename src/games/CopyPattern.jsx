import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './CopyPattern.css';

const CopyPattern = ({ onBack }) => {
    const [pattern, setPattern] = useState([]);
    const [userPattern, setUserPattern] = useState([]);
    const [phase, setPhase] = useState('start');
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(3);

    const startGame = () => {
        const newPattern = Array.from({ length: level }, () => Math.floor(Math.random() * 9));
        setPattern(newPattern);
        setUserPattern([]);
        setPhase('showing');

        setTimeout(() => setPhase('input'), 2500);
    };

    const handleClick = (idx) => {
        if (phase !== 'input') return;

        const newUserPattern = [...userPattern, idx];
        setUserPattern(newUserPattern);

        if (newUserPattern.length === level) {
            checkPattern(newUserPattern);
        }
    };

    const checkPattern = (user) => {
        const correct = user.every((val, idx) => val === pattern[idx]);

        if (correct) {
            setScore(score + level * 10);
            setLevel(level + 1);
            setTimeout(startGame, 1000);
        } else {
            setPhase('failed');
        }
    };

    return (
        <GameLayout
            title="Copy Pattern"
            onBack={onBack}
            score={score}
            instructions="Watch the pattern, then recreate it!"
        >
            <div className="copy-pattern-container">
                {phase === 'start' && (
                    <div className="start-screen">
                        <div>Level {level}</div>
                        <button className="btn btn-primary" onClick={startGame}>Start</button>
                    </div>
                )}

                {(phase === 'showing' || phase === 'input') && (
                    <>
                        <div className="instruction">
                            {phase === 'showing' ? 'Watch!' : 'Recreate the pattern'}
                        </div>
                        <div className="pattern-grid">
                            {Array.from({ length: 9 }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`pattern-cell ${phase === 'showing' && pattern.includes(idx) ? 'active' : ''
                                        } ${userPattern.includes(idx) ? 'user-selected' : ''}`}
                                    onClick={() => handleClick(idx)}
                                ></div>
                            ))}
                        </div>
                    </>
                )}

                {phase === 'failed' && (
                    <div className="result glass-card">
                        <h2>Game Over</h2>
                        <p>Level Reached: {level}</p>
                        <p>Score: {score}</p>
                        <button className="btn btn-primary" onClick={() => { setLevel(3); setScore(0); startGame(); }}>
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default CopyPattern;
