import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';

const SymmetryTest = ({ onBack }) => {
    const [grid, setGrid] = useState([]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useState(() => {
        generateChallenge();
    }, []);

    const generateChallenge = () => {
        const isSymmetric = Math.random() < 0.5;
        const g = Array(25).fill(0);

        if (isSymmetric) {
            for (let i = 0; i < 25; i++) {
                if (i % 5 < 2) {
                    g[i] = Math.floor(Math.random() * 2);
                    g[Math.floor(i / 5) * 5 + (4 - i % 5)] = g[i];
                } else if (i % 5 === 2) {
                    g[i] = Math.floor(Math.random() * 2);
                }
            }
        } else {
            g.forEach((_, i) => {
                g[i] = Math.floor(Math.random() * 2);
            });
            if (Math.random() < 0.3) {
                const idx = Math.floor(Math.random() * 25);
                g[idx] = 1 - g[idx];
            }
        }

        setGrid(g);
        setFeedback('');
    };

    const handleAnswer = (ans) => {
        const isSymmetric = grid.every((val, i) => {
            const row = Math.floor(i / 5);
            const col = i % 5;
            const mirrorCol = 4 - col;
            const mirrorIdx = row * 5 + mirrorCol;
            return val === grid[mirrorIdx];
        });

        const correct = (ans === 'yes' && isSymmetric) || (ans === 'no' && !isSymmetric);

        if (correct) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateChallenge, 700);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout title="Symmetry Test" onBack={onBack} score={score} instructions="Is the pattern symmetric?">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--spacing-xs)', padding: 'var(--spacing-md)' }}>
                    {grid.map((val, i) => (
                        <div
                            key={i}
                            style={{
                                width: '50px',
                                height: '50px',
                                background: val === 1 ? 'var(--accent-purple)' : 'var(--glass-bg)',
                                border: '2px solid var(--glass-border)',
                                borderRadius: 'var(--radius-sm)'
                            }}
                        />
                    ))}
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
                    <button className="btn btn-primary" onClick={() => handleAnswer('yes')}>YES</button>
                    <button className="btn btn-primary" onClick={() => handleAnswer('no')}>NO</button>
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default SymmetryTest;
