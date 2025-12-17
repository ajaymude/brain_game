import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './MirrorMatch.css';

const MirrorMatch = ({ onBack }) => {
    const [shape, setShape] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const shapes = ['▲', '■', '⬟'];

    useEffect(() => {
        generateChallenge();
    }, []);

    const generateChallenge = () => {
        setShape(shapes[Math.floor(Math.random() * shapes.length)]);
        setIsFlipped(Math.random() < 0.5);
        setFeedback('');
    };

    const handleAnswer = (ans) => {
        const correct = (ans === 'mirrored' && isFlipped) || (ans === 'normal' && !isFlipped);

        if (correct) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateChallenge, 700);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout title="Mirror Match" onBack={onBack} score={score} instructions="Is the shape mirrored or normal?">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', fontSize: '6rem', transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)' }}>
                    {shape}
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
                    <button className="btn btn-primary" onClick={() => handleAnswer('normal')}>Normal</button>
                    <button className="btn btn-primary" onClick={() => handleAnswer('mirrored')}>Mirrored</button>
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default MirrorMatch;
