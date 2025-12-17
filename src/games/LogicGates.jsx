import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './LogicGates.css';

const LogicGates = ({ onBack }) => {
    const [problem, setProblem] = useState({});
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useState(() => {
        generateProblem();
    }, []);

    const generateProblem = () => {
        const a = Math.random() < 0.5;
        const b = Math.random() < 0.5;
        const gates = ['AND', 'OR', 'NOT'];
        const gate = gates[Math.floor(Math.random() * gates.length)];

        let ans;
        if (gate === 'AND') ans = a && b;
        else if (gate === 'OR') ans = a || b;
        else ans = !a;

        setProblem({ a, b, gate, answer: ans });
        setFeedback('');
    };

    const handleAnswer = (ans) => {
        if (ans === problem.answer) {
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
            title="Logic Gates"
            onBack={onBack}
            score={score}
            instructions="Evaluate the logic gate!"
        >
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-md)' }}>
                        A = {problem.a ? 'TRUE' : 'FALSE'}
                        {problem.gate !== 'NOT' && `, B = ${problem.b ? 'TRUE' : 'FALSE'}`}
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--accent-purple)' }}>
                        {problem.gate}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
                    <button className="btn btn-primary" onClick={() => handleAnswer(true)}>
                        TRUE
                    </button>
                    <button className="btn btn-primary" onClick={() => handleAnswer(false)}>
                        FALSE
                    </button>
                </div>

                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default LogicGates;
