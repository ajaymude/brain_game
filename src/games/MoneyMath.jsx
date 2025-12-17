import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const MoneyMath = ({ onBack }) => {
    const [amount, setAmount] = useState(0);
    const [change, setChange] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const generateProblem = () => {
        const a = Math.floor(Math.random() * 50) + 5;
        const c = Math.floor(Math.random() * 20) + 5;
        setAmount(a);
        setChange(c);
        setUserAnswer('');
        setFeedback('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleSubmit = () => {
        if (parseFloat(userAnswer) === amount - change) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateProblem, 1000);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout title="Money Math" onBack={onBack} score={score} instructions="Calculate the change!">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-md)' }}>Item costs: ${change}</div>
                    <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-md)' }}>You pay: ${amount}</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>Change = ?</div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <div style={{ fontSize: '2rem' }}>$</div>
                    <input
                        type="number"
                        step="0.01"
                        className="glass-card"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                        style={{ width: '150px', padding: '14px', fontSize: '1.5rem', textAlign: 'center' }}
                        placeholder="0.00"
                        autoFocus
                    />
                    <button className="btn btn-primary" onClick={handleSubmit}>Check</button>
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default MoneyMath;
