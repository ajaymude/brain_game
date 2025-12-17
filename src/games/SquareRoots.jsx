import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const SquareRoots = ({ onBack }) => {
    const [number, setNumber] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const generateProblem = () => {
        const perfectSquares = [4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144];
        setNumber(perfectSquares[Math.floor(Math.random() * perfectSquares.length)]);
        setUserAnswer('');
        setFeedback('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleSubmit = () => {
        if (parseInt(userAnswer) === Math.sqrt(number)) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateProblem, 1000);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout title="Square Roots" onBack={onBack} score={score} instructions="Find the square root!">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', fontWeight: '900', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>√{number} = ?</div>
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

export default SquareRoots;
