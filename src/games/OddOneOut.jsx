import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const OddOneOut = ({ onBack }) => {
    const [items, setItems] = useState([]);
    const [oddIdx, setOddIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const generateProblem = () => {
        const base = Math.floor(Math.random() * 50) + 10;
        const nums = [base, base, base, base + Math.floor(Math.random() * 10) + 1];
        const shuffled = nums.sort(() => Math.random() - 0.5);
        const odd = shuffled.findIndex(n => n !== base);
        setItems(shuffled);
        setOddIdx(odd);
        setFeedback('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleClick = (idx) => {
        if (idx === oddIdx) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateProblem, 1000);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout title="Odd One Out" onBack={onBack} score={score} instructions="Click the different number!">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-lg)' }}>
                    {items.map((n, i) => (
                        <button
                            key={i}
                            className="btn btn-secondary"
                            style={{ fontSize: '3rem', padding: 'var(--spacing-xl)' }}
                            onClick={() => handleClick(i)}
                        >
                            {n}
                        </button>
                    ))}
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default OddOneOut;
