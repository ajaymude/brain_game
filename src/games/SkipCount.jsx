import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const SkipCount = ({ onBack }) => {
    const [start, setStart] = useState(0);
    const [skip, setSkip] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const generateProblem = () => {
        const s = Math.floor(Math.random() * 10) + 1;
        const sk = Math.floor(Math.random() * 5) + 2;
        setStart(s);
        setSkip(sk);
        setUserAnswer('');
        setFeedback('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleSubmit = () => {
        if (parseInt(userAnswer) === start + skip) {
            setFeedback('✅');
            setScore(score + 3);
            setTimeout(generateProblem, 800);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout title="Skip Counting" onBack={onBack} score={score} instructions="What's the next number in the pattern?">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: 'var(--spacing-md)' }}>Pattern: +{skip}</div>
                    <div style={{ fontSize: '3rem', fontWeight: '900', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {start}, {start + skip}, ?
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <input
                        type="number"
                        className="glass-card"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                        style={{ width: '120px', padding: '14px', fontSize: '1.5rem', textAlign: 'center' }}
                        placeholder="Next"
                        autoFocus
                    />
                    <button className="btn btn-primary" onClick={handleSubmit}>Check</button>
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default SkipCount;
