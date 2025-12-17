import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './GreaterSum.css';

const GreaterSum = ({ onBack }) => {
    const [nums, setNums] = useState({ left: [], right: [] });
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        generateProblem();
    }, []);

    const generateProblem = () => {
        const left = Array.from({ length: 3 }, () => Math.floor(Math.random() * 20) + 1);
        const right = Array.from({ length: 3 }, () => Math.floor(Math.random() * 20) + 1);
        setNums({ left, right });
        setFeedback('');
    };

    const sum = (arr) => arr.reduce((a, b) => a + b, 0);

    const handleAnswer = (ans) => {
        const leftSum = sum(nums.left);
        const rightSum = sum(nums.right);
        let correct = false;

        if (ans === 'left' && leftSum > rightSum) correct = true;
        if (ans === 'right' && rightSum > leftSum) correct = true;
        if (ans === 'equal' && leftSum === rightSum) correct = true;

        if (correct) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateProblem, 700);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout
            title="Greater Sum"
            onBack={onBack}
            score={score}
            instructions="Which side has the greater sum?"
        >
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 'var(--spacing-xl)' }}>
                    <div className="glass-card" style={{ padding: 'var(--spacing-lg)' }}>
                        <div style={{ fontSize: '1.5rem' }}>{nums.left.join(' + ')}</div>
                    </div>
                    <div style={{ fontSize: '2rem', color: 'var(--text-secondary)' }}>VS</div>
                    <div className="glass-card" style={{ padding: 'var(--spacing-lg)' }}>
                        <div style={{ fontSize: '1.5rem' }}>{nums.right.join(' + ')}</div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <button className="btn btn-primary" onClick={() => handleAnswer('left')}>Left</button>
                    <button className="btn btn-primary" onClick={() => handleAnswer('equal')}>Equal</button>
                    <button className="btn btn-primary" onClick={() => handleAnswer('right')}>Right</button>
                </div>

                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default GreaterSum;
