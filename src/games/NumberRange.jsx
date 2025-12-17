import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const NumberRange = ({ onBack }) => {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const generateProblem = () => {
        const a = Math.floor(Math.random() * 50) + 1;
        const b = Math.floor(Math.random() * 50) + 1;
        setMin(Math.min(a, b));
        setMax(Math.max(a, b));
        setUserAnswer('');
        setFeedback('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleSubmit = () => {
        if (parseInt(userAnswer) === max - min) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateProblem, 1000);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout title="Number Range" onBack={onBack} score={score} instructions="What's the difference between the numbers?">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '900', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {max} - {min} = ?
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <input
                        type="number"
                        className="glass-card"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                        style={{ width: '150px', padding: '14px', fontSize: '1.5rem', textAlign: 'center' }}
                        placeholder="Answer"
                        autoFocus
                    />
                    <button className="btn btn-primary" onClick={handleSubmit}>Check</button>
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default NumberRange;
