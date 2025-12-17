import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const EvenOdd = ({ onBack }) => {
    const [numbers, setNumbers] = useState([]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const generateProblem = () => {
        const nums = Array.from({ length: 8 }, () => Math.floor(Math.random() * 50) + 1);
        setNumbers(nums);
        setFeedback('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const countEven = () => {
        const evenCount = numbers.filter(n => n % 2 === 0).length;
        return evenCount;
    };

    const countOdd = () => {
        return numbers.length - countEven();
    };

    const handleAnswer = (ans) => {
        const correct = (ans === 'even' && countEven() > countOdd()) || (ans === 'odd' && countOdd() > countEven());
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
        <GameLayout title="Even or Odd Majority" onBack={onBack} score={score} instructions="Are there more even or odd numbers?">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-lg)', display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {numbers.map((n, i) => (
                        <div key={i} style={{ fontSize: '2rem', fontWeight: '700', padding: 'var(--spacing-sm)', minWidth: '60px', textAlign: 'center' }}>
                            {n}
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
                    <button className="btn btn-primary" onClick={() => handleAnswer('even')}>More Even</button>
                    <button className="btn btn-primary" onClick={() => handleAnswer('odd')}>More Odd</button>
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default EvenOdd;
