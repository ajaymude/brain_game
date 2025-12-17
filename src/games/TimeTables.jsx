import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './TimeTables.css';

const TimeTables = ({ onBack }) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        generateProblem();
    }, []);

    const generateProblem = () => {
        setNum1(Math.floor(Math.random() * 12) + 1);
        setNum2(Math.floor(Math.random() * 12) + 1);
        setUserAnswer('');
        setFeedback('');
    };

    const handleSubmit = () => {
        if (parseInt(userAnswer) === num1 * num2) {
            setFeedback('✅ Correct!');
            setScore(score + 5);
            setTimeout(generateProblem, 1000);
        } else {
            setFeedback('❌ Wrong!');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <GameLayout
            title="Times Tables"
            onBack={onBack}
            score={score}
            instructions="Practice your multiplication tables!"
        >
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', minWidth: '350px', textAlign: 'center' }}>
                    <div style={{ fontSize: '3.5rem', fontWeight: '900', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {num1} × {num2} = ?
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <input
                        type="number"
                        className="glass-card"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={{ width: '150px', padding: '14px', fontSize: '1.5rem', textAlign: 'center' }}
                        placeholder="Answer"
                        autoFocus
                    />
                    <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>

                {feedback && (
                    <div style={{ fontSize: '1.3rem', fontWeight: '700', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', color: feedback.includes('✅') ? 'var(--accent-green)' : 'var(--accent-orange)', background: feedback.includes('✅') ? 'rgba(16,185,129,0.1)' : 'rgba(249,115,22,0.1)' }}>
                        {feedback}
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default TimeTables;
