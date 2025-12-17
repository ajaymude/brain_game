import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const QuickSort = ({ onBack }) => {
    const [numbers, setNumbers] = useState([]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const generateProblem = () => {
        const nums = Array.from({ length: 5 }, () => Math.floor(Math.random() * 20) + 1);
        setNumbers(nums);
        setFeedback('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleAnswer = (ans) => {
        const isSorted = [...numbers].sort((a, b) => a - b).every((n, i) => n === numbers[i]);
        const correct = (ans === 'yes' && isSorted) || (ans === 'no' && !isSorted);

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
        <GameLayout title="Quick Sort Check" onBack={onBack} score={score} instructions="Are the numbers in ascending order?">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '900', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'flex', gap: 'var(--spacing-md)' }}>
                        {numbers.map((n, i) => <div key={i}>{n}</div>)}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
                    <button className="btn btn-primary" onClick={() => handleAnswer('yes')}>YES</button>
                    <button className="btn btn-primary" onClick={() => handleAnswer('no')}>NO</button>
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default QuickSort;
