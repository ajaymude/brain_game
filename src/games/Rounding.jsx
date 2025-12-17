import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const Rounding = ({ onBack }) => {
    const [number, setNumber] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const generateProblem = () => {
        setNumber(Math.floor(Math.random() * 100) + 1);
        setUserAnswer('');
        setFeedback('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleSubmit = () => {
        const rounded = Math.round(number / 10) * 10;
        if (parseInt(userAnswer) === rounded) {
            setFeedback('✅');
            setScore(score + 3);
            setTimeout(generateProblem, 1000);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout title="Rounding Numbers" onBack={onBack} score={score} instructions="Round to the nearest 10!">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-md)' }}>Round to nearest 10:</div>
                    <div style={{ fontSize: '4rem', fontWeight: '900', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {number}
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
                        placeholder="Rounded"
                        autoFocus
                    />
                    <button className="btn btn-primary" onClick={handleSubmit}>Check</button>
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default Rounding;
