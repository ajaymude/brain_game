import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';

const QuickCount = ({ onBack }) => {
    const [number, setNumber] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useState(() => {
        generateProblem();
    }, []);

    const countDigits = (n) => {
        return n.toString().length;
    };

    const generateProblem = () => {
        setNumber(Math.floor(Math.random() * 9000000) + 1000);
        setUserAnswer('');
        setFeedback('');
    };

    const handleSubmit = () => {
        if (parseInt(userAnswer) === countDigits(number)) {
            setFeedback('✅');
            setScore(score + 3);
            setTimeout(generateProblem, 800);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout title="Quick Count" onBack={onBack} score={score} instructions="How many digits?">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '900', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
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
                        style={{ width: '100px', padding: '14px', fontSize: '1.5rem', textAlign: 'center' }}
                        placeholder="Count"
                        autoFocus
                    />
                    <button className="btn btn-primary" onClick={handleSubmit}>Check</button>
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default QuickCount;
