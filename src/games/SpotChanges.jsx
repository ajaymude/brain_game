import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './SpotChanges.css';

const SpotChanges = ({ onBack }) => {
    const [grid1, setGrid1] = useState([]);
    const [grid2, setGrid2] = useState([]);
    const [differences, setDifferences] = useState([]);
    const [found, setFound] = useState([]);
    const [score, setScore] = useState(0);

    const symbols = ['⬤', '■', '▲', '⬟', '⭐'];

    useState(() => {
        generateChallenge();
    }, []);

    const generateChallenge = () => {
        const g1 = Array.from({ length: 25 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
        const g2 = [...g1];
        const diffs = [];

        while (diffs.length < 5) {
            const idx = Math.floor(Math.random() * 25);
            if (!diffs.includes(idx)) {
                diffs.push(idx);
                g2[idx] = symbols[Math.floor(Math.random() * symbols.length)];
            }
        }

        setGrid1(g1);
        setGrid2(g2);
        setDifferences(diffs);
        setFound([]);
    };

    const handleClick = (idx) => {
        if (differences.includes(idx) && !found.includes(idx)) {
            setFound([...found, idx]);
            setScore(score + 10);
            if (found.length === 4) {
                setTimeout(generateChallenge, 1500);
            }
        }
    };

    return (
        <GameLayout
            title="Spot Changes"
            onBack={onBack}
            score={score}
            instructions="Find 5 differences between the grids!"
        >
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ display: 'flex', gap: 'var(--spacing-xl)', justifyContent: 'center' }}>
                    <div className="glass-card" style={{ padding: 'var(--spacing-md)', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--spacing-xs)', width: '250px' }}>
                        {grid1.map((s, i) => (
                            <div key={i} style={{ fontSize: '1.8rem', textAlign: 'center' }}>{s}</div>
                        ))}
                    </div>

                    <div className="glass-card" style={{ padding: 'var(--spacing-md)', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--spacing-xs)', width: '250px' }}>
                        {grid2.map((s, i) => (
                            <div
                                key={i}
                                style={{
                                    fontSize: '1.8rem',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    background: found.includes(i) ? 'rgba(16,185,129,0.3)' : 'transparent'
                                }}
                                onClick={() => handleClick(i)}
                            >
                                {s}
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: 'var(--spacing-md)' }}>
                    Found: {found.length}/5
                </div>
            </div>
        </GameLayout>
    );
};

export default SpotChanges;
