import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './Divisibility.css';

const Divisibility = ({ onBack }) => {
    const [number, setNumber] = useState(0);
    const [divisor, setDivisor] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useState(() => {
        generateProblem();
    }, []);

    const generateProblem = () => {
        const div = [2, 3, 4, 5, 6, 7, 8, 9, 10][Math.floor(Math.random() * 9)];
        const num = Math.floor(Math.random() * 100) + 1;
        setNumber(num);
        setDivisor(div);
        setFeedback('');
    };

    const handleAnswer = (ans) => {
        const isDivisible = number % divisor === 0;
        const correct = (ans === 'yes' && isDivisible) || (ans === 'no' && !isDivisible);

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
            title="Divisibility"
            onBack={onBack}
            score={score}
            instructions={`Is ${number} divisible by ${divisor}?`}
        >
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', fontWeight: '900', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {number}
                    </div>
                    <div style={{ fontSize: '1.5rem', marginTop: 'var(--spacing-md)', color: 'var(--accent-cyan)' }}>
                        divisible by {divisor}?
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
                    <button
                        className="btn btn-primary"
                        style={{ fontSize: '1.3rem', padding: '16px 40px' }}
                        onClick={() => handleAnswer('yes')}
                    >
                        YES
                    </button>
                    <button
                        className="btn btn-primary"
                        style={{ fontSize: '1.3rem', padding: '16px 40px' }}
                        onClick={() => handleAnswer('no')}
                    >
                        NO
                    </button>
                </div>

                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default Divisibility;
