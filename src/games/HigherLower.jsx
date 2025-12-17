import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';

const HigherLower = ({ onBack }) => {
    const [current, setCurrent] = useState(0);
    const [next, setNext] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useState(() => {
        generateProblem();
    }, []);

    const generateProblem = () => {
        setCurrent(Math.floor(Math.random() * 100) + 1);
        setNext(Math.floor(Math.random() * 100) + 1);
        setFeedback('');
    };

    const handleAnswer = (ans) => {
        let correct = false;
        if (ans === 'higher' && next > current) correct = true;
        if (ans === 'lower' && next < current) correct = true;
        if (ans === 'same' && next === current) correct = true;

        if (correct) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(() => {
                setCurrent(next);
                setNext(Math.floor(Math.random() * 100) + 1);
                setFeedback('');
            }, 700);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout title="Higher or Lower" onBack={onBack} score={score} instructions="Is the next number higher, lower, or the same?">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', fontWeight: '900', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {current}
                    </div>
                </div>
                <div style={{ fontSize: '1.5rem', color: 'var(--accent-cyan)' }}>Next number will be...</div>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <button className="btn btn-primary" onClick={() => handleAnswer('higher')}>Higher</button>
                    <button className="btn btn-primary" onClick={() => handleAnswer('same')}>Same</button>
                    <button className="btn btn-primary" onClick={() => handleAnswer('lower')}>Lower</button>
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default HigherLower;
