import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const BigSmall = ({ onBack }) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [num3, setNum3] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const generateProblem = () => {
        setNum1(Math.floor(Math.random() * 100) + 1);
        setNum2(Math.floor(Math.random() * 100) + 1);
        setNum3(Math.floor(Math.random() * 100) + 1);
        setFeedback('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleAnswer = (ans) => {
        const nums = [num1, num2, num3];
        const max = Math.max(...nums);
        let correct = false;
        if (ans === 0 && nums[0] === max) correct = true;
        if (ans === 1 && nums[1] === max) correct = true;
        if (ans === 2 && nums[2] === max) correct = true;

        if (correct) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateProblem, 1000);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout title="Biggest Number" onBack={onBack} score={score} instructions="Click the biggest number!">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 'var(--spacing-lg)', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {[num1, num2, num3].map((n, i) => (
                        <button
                            key={i}
                            className="btn btn-primary"
                            style={{ fontSize: '3rem', minWidth: '150px', padding: 'var(--spacing-lg)' }}
                            onClick={() => handleAnswer(i)}
                        >
                            {n}
                        </button>
                    ))}
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default BigSmall;
