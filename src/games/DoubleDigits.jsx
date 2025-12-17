import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const DoubleDigits = ({ onBack }) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const generateProblem = () => {
        setNum1(Math.floor(Math.random() * 90) + 10);
        setNum2(Math.floor(Math.random() * 90) + 10);
        setUserAnswer('');
        setFeedback('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleSubmit = () => {
        if (parseInt(userAnswer) === num1 + num2) {
            setFeedback('✅');
            setScore(score + 3);
            setTimeout(generateProblem, 800);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout title="Double Digit Add" onBack={onBack} score={score} instructions="Add two-digit numbers quickly!">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '3.5rem', fontWeight: '900', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {num1} + {num2} = ?
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
                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default DoubleDigits;
