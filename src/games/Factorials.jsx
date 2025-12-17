import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const Factorials = ({ onBack }) => {
    const [number, setNumber] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const factorial = (n) => {
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        return result;
    };

    const generateProblem = () => {
        setNumber(Math.floor(Math.random() * 8) + 1);
        setUserAnswer('');
        setFeedback('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleSubmit = () => {
        if (parseInt(userAnswer) === factorial(number)) {
            setFeedback('✅');
            setScore(score + 10);
            setTimeout(generateProblem, 1000);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout title="Factorials" onBack={onBack} score={score} instructions="Calculate the factorial!">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', fontWeight: '900', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{number}!</div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <input type="number" className="glass-card" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSubmit()} style={{ width: '150px', padding: '14px', fontSize: '1.5rem', textAlign: 'center' }} placeholder="Answer" autoFocus />
                    <button className="btn btn-primary" onClick={handleSubmit}>Check</button>
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default Factorials;
