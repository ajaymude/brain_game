import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const MissingLetter = ({ onBack }) => {
    const [word, setWord] = useState('');
    const [missing, setMissing] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const words = ['PUZZLE', 'BRAIN', 'GAME', 'CHALLENGE', 'FOCUS', 'MEMORY'];

    const generateProblem = () => {
        const w = words[Math.floor(Math.random() * words.length)];
        const idx = Math.floor(Math.random() * w.length);
        const m = w[idx];
        const display = w.substring(0, idx) + '_' + w.substring(idx + 1);
        setWord(display);
        setMissing(m);
        setUserAnswer('');
        setFeedback('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleSubmit = () => {
        if (userAnswer.toUpperCase() === missing) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateProblem, 1000);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout title="Missing Letter" onBack={onBack} score={score} instructions="What letter is missing?">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', fontWeight: '900', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '8px' }}>
                        {word}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <input
                        type="text"
                        maxLength="1"
                        className="glass-card"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                        style={{ width: '80px', padding: '14px', fontSize: '2rem', textAlign: 'center', textTransform: 'uppercase' }}
                        placeholder="?"
                        autoFocus
                    />
                    <button className="btn btn-primary" onClick={handleSubmit}>Check</button>
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default MissingLetter;
