import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const TrueFalse = ({ onBack }) => {
    const [statement, setStatement] = useState('');
    const [answer, setAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const statements = [
        { text: 'The Earth is flat', ans: false },
        { text: 'Water boils at 100°C', ans: true },
        { text: 'Humans have 4 legs', ans: false },
        { text: 'A triangle has 3 sides', ans: true },
        { text: 'Fish can fly', ans: false },
        { text: 'The sun rises in the East', ans: true },
        { text: 'Ice is hot', ans: false },
        { text: 'A day has 24 hours', ans: true }
    ];

    const generateProblem = () => {
        const s = statements[Math.floor(Math.random() * statements.length)];
        setStatement(s.text);
        setAnswer(s.ans);
        setFeedback('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleAnswer = (ans) => {
        if (ans === answer) {
            setFeedback('✅');
            setScore(score + 3);
            setTimeout(generateProblem, 800);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout title="True or False" onBack={onBack} score={score} instructions="Is this statement true or false?">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '700' }}>{statement}</div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
                    <button className="btn btn-primary" style={{ fontSize: '1.5rem', padding: 'var(--spacing-lg)' }} onClick={() => handleAnswer(true)}>TRUE</button>
                    <button className="btn btn-primary" style={{ fontSize: '1.5rem', padding: 'var(--spacing-lg)' }} onClick={() => handleAnswer(false)}>FALSE</button>
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default TrueFalse;
