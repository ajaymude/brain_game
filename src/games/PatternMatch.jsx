import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';

const PatternMatch = ({ onBack }) => {
    const [pattern, setPattern] = useState([]);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const symbols = ['⬤', '■', '▲', '⬟', '⭐', '♦'];

    useState(() => {
        generateChallenge();
    }, []);

    const generateChallenge = () => {
        const p = Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]);
        const opts = [p.join('')];

        while (opts.length < 4) {
            const wrong = Array.from({ length: 3 }, () => symbols[Math.floor(Math.random() * symbols.length)]).join('');
            if (!opts.includes(wrong)) opts.push(wrong);
        }

        setPattern(p);
        setOptions(opts.sort(() => Math.random() - 0.5));
        setFeedback('');
    };

    const handleAnswer = (ans) => {
        if (ans === pattern.join('')) {
            setFeedback('✅');
            setScore(score + 10);
            setTimeout(generateChallenge, 1000);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout title="Pattern Match" onBack={onBack} score={score} instructions="Find the matching pattern!">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-lg)' }}>
                    <div style={{ fontSize: '3rem', display: 'flex', gap: 'var(--spacing-sm)' }}>
                        {pattern.map((s, i) => <div key={i}>{s}</div>)}
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-md)' }}>
                    {options.map((opt, i) => (
                        <button key={i} className="btn btn-secondary" style={{ fontSize: '2rem', padding: 'var(--spacing-md)' }} onClick={() => handleAnswer(opt)}>
                            {opt.split('').map((s, j) => <span key={j} style={{ marginRight: '8px' }}>{s}</span>)}
                        </button>
                    ))}
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default PatternMatch;
