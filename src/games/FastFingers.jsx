import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const FastFingers = ({ onBack }) => {
    const [target, setTarget] = useState('');
    const [userInput, setUserInput] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameActive, setGameActive] = useState(false);

    const words = ['QUICK', 'BROWN', 'FOX', 'JUMPS', 'LAZY', 'DOG', 'SMART', 'BRAIN'];

    useEffect(() => {
        if (gameActive && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setGameActive(false);
        }
    }, [gameActive, timeLeft]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameActive(true);
        generateWord();
    };

    const generateWord = () => {
        setTarget(words[Math.floor(Math.random() * words.length)]);
        setUserInput('');
    };

    const handleChange = (e) => {
        const val = e.target.value.toUpperCase();
        setUserInput(val);
        if (val === target) {
            setScore(score + 5);
            generateWord();
        }
    };

    return (
        <GameLayout title="Fast Fingers" onBack={onBack} score={score} timer={gameActive ? timeLeft : null} instructions="Type the word as fast as you can!">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center', minHeight: '400px', justifyContent: 'center' }}>
                {!gameActive ? (
                    <button className="btn btn-primary" onClick={startGame}>Start</button>
                ) : (
                    <>
                        <div className="glass-card" style={{ padding: 'var(--spacing-xl)', minWidth: '300px', textAlign: 'center' }}>
                            <div style={{ fontSize: '3.5rem', fontWeight: '900', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                {target}
                            </div>
                        </div>
                        <input
                            type="text"
                            className="glass-card"
                            value={userInput}
                            onChange={handleChange}
                            style={{ width: '300px', padding: '16px', fontSize: '2rem', textAlign: 'center', textTransform: 'uppercase' }}
                            placeholder="TYPE HERE"
                            autoFocus
                        />
                    </>
                )}
            </div>
        </GameLayout>
    );
};

export default FastFingers;
