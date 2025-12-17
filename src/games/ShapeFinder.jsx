import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const ShapeFinder = ({ onBack }) => {
    const [shapes, setShapes] = useState([]);
    const [target, setTarget] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const symbols = ['⬤', '■', '▲', '★'];

    const generateProblem = () => {
        const t = symbols[Math.floor(Math.random() * symbols.length)];
        const grid = Array(20).fill(null).map(() => symbols[Math.floor(Math.random() * symbols.length)]);
        const count = Math.floor(Math.random() * 5) + 3;
        for (let i = 0; i < count; i++) {
            grid[Math.floor(Math.random() * 20)] = t;
        }
        setTarget(t);
        setShapes(grid);
        setFeedback('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleClick = (idx) => {
        if (shapes[idx] === target) {
            setScore(score + 3);
            const newShapes = [...shapes];
            newShapes[idx] = '✓';
            setShapes(newShapes);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 500);
        }
    };

    return (
        <GameLayout title="Shape Finder" onBack={onBack} score={score} instructions={`Click all the ${target} shapes!`}>
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-md)', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--spacing-sm)' }}>
                    {shapes.map((s, i) => (
                        <div
                            key={i}
                            onClick={() => handleClick(i)}
                            style={{
                                width: '60px',
                                height: '60px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                background: 'var(--glass-bg)',
                                border: '2px solid var(--glass-border)',
                                borderRadius: 'var(--radius-sm)',
                                cursor: 'pointer'
                            }}
                        >
                            {s}
                        </div>
                    ))}
                </div>
                {feedback && <div style={{ fontSize: '3rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default ShapeFinder;
