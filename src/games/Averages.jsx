import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const Averages = ({ onBack }) => {
    const [numbers, setNumbers] = useState([]);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        generateProblem();
    }, []);

    const generateProblem = () => {
        const nums = Array.from({ length: 3 }, () => Math.floor(Math.random() * 20) + 1);
        setNumbers(nums);
        setUserAnswer('');
        setFeedback('');
    };

    const handleSubmit = () => {
        const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        if (Math.abs(parseFloat(userAnswer) - avg) < 0.1) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateProblem, 1000);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout title="Averages" onBack={onBack} score={score} instructions="Calculate the average!">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: 'var(--spacing-md)' }}>Average of</div>
                    <div style={{ fontSize: '3rem', fontWeight: '900', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {numbers.join(', ')}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <input
                        type="number"
                        step="0.1"
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

export default Averages;
