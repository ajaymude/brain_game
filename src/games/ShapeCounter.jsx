import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './ShapeCounter.css';

const ShapeCounter = ({ onBack }) => {
    const [shapes, setShapes] = useState([]);
    const [target, setTarget] = useState('');
    const [userCount, setUserCount] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const symbols = ['⬤', '■', '▲', '⬟'];

    useState(() => {
        generateChallenge();
    }, []);

    const generateChallenge = () => {
        const t = symbols[Math.floor(Math.random() * symbols.length)];
        const count = Math.floor(Math.random() * 15) + 5;
        const grid = Array(40).fill(null).map(() => symbols[Math.floor(Math.random() * symbols.length)]);

        for (let i = 0; i < count; i++) {
            grid[Math.floor(Math.random() * 40)] = t;
        }

        setTarget(t);
        setShapes(grid);
        setUserCount('');
        setFeedback('');
    };

    const handleSubmit = () => {
        const actualCount = shapes.filter(s => s === target).length;
        if (parseInt(userCount) === actualCount) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateChallenge, 1000);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout
            title="Shape Counter"
            onBack={onBack}
            score={score}
            instructions="Count how many target shapes!"
        >
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', padding: 'var(--spacing-md)' }}>
                    <span>Count:</span>
                    <div style={{ fontSize: '2rem' }}>{target}</div>
                </div>

                <div className="glass-card" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)', padding: 'var(--spacing-md)', maxWidth: '500px' }}>
                    {shapes.map((s, i) => (
                        <div key={i} style={{ fontSize: '1.5rem' }}>{s}</div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <input
                        type="number"
                        className="glass-card"
                        value={userCount}
                        onChange={(e) => setUserCount(e.target.value)}
                        placeholder="Count"
                        style={{ width: '100px', padding: '12px', textAlign: 'center', fontSize: '1.3rem' }}
                        autoFocus
                    />
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Check
                    </button>
                </div>

                {feedback && <div style={{ fontSize: '3rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default ShapeCounter;
