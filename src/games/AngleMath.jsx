import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const AngleMath = ({ onBack }) => {
    const [angle1, setAngle1] = useState(0);
    const [angle2, setAngle2] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const generateProblem = () => {
        const a1 = Math.floor(Math.random() * 180) + 1;
        const a2 = Math.floor(Math.random() * (180 - a1)) + 1;
        setAngle1(a1);
        setAngle2(a2);
        setUserAnswer('');
        setFeedback('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleSubmit = () => {
        if (parseInt(userAnswer) === 180 - angle1 - angle2) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateProblem, 1000);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout title="Angle Math" onBack={onBack} score={score} instructions="Find the missing angle! (angles in a triangle sum to 180°)">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-md)' }}>Triangle Angles: {angle1}° + {angle2}° + ?° = 180°</div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <input type="number" className="glass-card" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSubmit()} style={{ width: '150px', padding: '14px', fontSize: '1.5rem', textAlign: 'center' }} placeholder="Angle" autoFocus />
                    <button className="btn btn-primary" onClick={handleSubmit}>Check</button>
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default AngleMath;
