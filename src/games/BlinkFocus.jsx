import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './BlinkFocus.css';

const BlinkFocus = ({ onBack }) => {
    const [target, setTarget] = useState('X');
    const [grid, setGrid] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameActive, setGameActive] = useState(false);

    useState(() => {
        if (gameActive) {
            const timer = setInterval(() => {
                setTimeLeft(t => {
                    if (t <= 1) {
                        setGameActive(false);
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameActive]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameActive(true);
        generateGrid();
    };

    const generateGrid = () => {
        const g = Array(25).fill('O');
        const targetCount = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < targetCount; i++) {
            g[Math.floor(Math.random() * 25)] = 'X';
        }
        setGrid(g);
        setTimeout(generateGrid, 2000);
    };

    const handleClick = (idx) => {
        if (grid[idx] === 'X') {
            setScore(score + 5);
            const newGrid = [...grid];
            newGrid[idx] = '✓';
            setGrid(newGrid);
        }
    };

    return (
        <GameLayout
            title="Blink Focus"
            onBack={onBack}
            score={score}
            timer={gameActive ? timeLeft : null}
            instructions="Click the X's before they disappear!"
        >
            <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', alignItems: 'center' }}>
                {!gameActive ? (
                    <button className="btn btn-primary" onClick={startGame}>Start</button>
                ) : (
                    <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--spacing-sm)', padding: 'var(--spacing-md)' }}>
                        {grid.map((s, i) => (
                            <div
                                key={i}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    fontWeight: '700',
                                    background: s === 'X' ? 'rgba(239,68,68,0.3)' : s === '✓' ? 'rgba(16,185,129,0.3)' : 'var(--glass-bg)',
                                    border: '2px solid var(--glass-border)',
                                    borderRadius: 'var(--radius-sm)',
                                    cursor: 'pointer'
                                }}
                                onClick={() => handleClick(i)}
                            >
                                {s}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default BlinkFocus;
