import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './Comparisons.css';

const Comparisons = ({ onBack }) => {
    const [problem, setProblem] = useState({ left: 0, right: 0 });
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        generateProblem();
    }, []);

    const generateProblem = () => {
        const left = Math.floor(Math.random() * 100) + 1;
        const right = Math.floor(Math.random() * 100) + 1;
        setProblem({ left, right });
        setFeedback('');
    };

    const handleAnswer = (answer) => {
        let correct = false;
        if (answer === '>' && problem.left > problem.right) correct = true;
        if (answer === '<' && problem.left < problem.right) correct = true;
        if (answer === '=' && problem.left === problem.right) correct = true;

        if (correct) {
            setFeedback('✅');
            setScore(score + 3);
            setTimeout(generateProblem, 600);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout
            title="Number Comparisons"
            onBack={onBack}
            score={score}
            instructions="Compare the numbers using>, <, or ="
        >
            <div className="comparisons-container">
                <div className="comparison-display glass-card">
                    <div className="comp-number">{problem.left}</div>
                    <div className="comp-symbol">?</div>
                    <div className="comp-number">{problem.right}</div>
                </div>

                <div className="symbol-buttons">
                    <button className="btn btn-primary symbol-btn" onClick={() => handleAnswer('>')}>
                        &gt;
                    </button>
                    <button className="btn btn-primary symbol-btn" onClick={() => handleAnswer('<')}>
                        &lt;
                    </button>
                    <button className="btn btn-primary symbol-btn" onClick={() => handleAnswer('=')}>
                        =
                    </button>
                </div>

                {feedback && <div className="feedback-icon">{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default Comparisons;
