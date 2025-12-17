import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './MentalMath.css';

const MentalMath = ({ onBack }) => {
    const [problem, setProblem] = useState({ q: '', a: 0 });
    const [userAns, setUserAns] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        generateProblem();
    }, []);

    const generateProblem = () => {
        const a = Math.floor(Math.random() * 20) + 1;
        const b = Math.floor(Math.random() * 20) + 1;
        const c = Math.floor(Math.random() * 10) + 1;
        const ops = ['+', '-'];
        const op1 = ops[Math.floor(Math.random() * 2)];
        const op2 = ops[Math.floor(Math.random() * 2)];

        let ans = a;
        if (op1 === '+') ans += b;
        else ans -= b;
        if (op2 === '+') ans += c;
        else ans -= c;

        setProblem({ q: `${a} ${op1} ${b} ${op2} ${c}`, a: ans });
        setUserAns('');
        setFeedback('');
    };

    const handleSubmit = () => {
        if (parseInt(userAns) === problem.a) {
            setFeedback('✅ Correct!');
            setScore(score + 10);
            setTimeout(generateProblem, 1000);
        } else {
            setFeedback('❌ Wrong!');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <GameLayout
            title="Mental Math"
            onBack={onBack}
            score={score}
            instructions="Solve the problem in your head!"
        >
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', minWidth: '350px', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '800', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {problem.q} = ?
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <input
                        type="number"
                        className="glass-card"
                        value={userAns}
                        onChange={(e) => setUserAns(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={{ width: '150px', padding: '14px', fontSize: '1.5rem', textAlign: 'center' }}
                        autoFocus
                    />
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Check
                    </button>
                </div>

                {feedback && (
                    <div style={{
                        fontSize: '1.3rem',
                        fontWeight: '700',
                        padding: 'var(--spacing-md)',
                        borderRadius: 'var(--radius-md)',
                        color: feedback.includes('✅') ? 'var(--accent-green)' : 'var(--accent-orange)',
                        background: feedback.includes('✅') ? 'rgba(16,185,129,0.1)' : 'rgba(249,115,22,0.1)'
                    }}>
                        {feedback}
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default MentalMath;
