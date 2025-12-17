import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './EquationSolver.css';

const EquationSolver = ({ onBack }) => {
    const [equation, setEquation] = useState({ text: '', answer: 0 });
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useState(() => {
        generateEquation();
    }, []);

    const generateEquation = () => {
        const x = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 20) + 1;
        const c = x + b;

        const templates = [
            { text: `x + ${b} = ${c}`, answer: x },
            { text: `${c} - x = ${b}`, answer: x },
            { text: `${b} + x = ${c}`, answer: x }
        ];

        const eq = templates[Math.floor(Math.random() * templates.length)];
        setEquation(eq);
        setUserAnswer('');
        setFeedback('');
    };

    const handleSubmit = () => {
        if (parseInt(userAnswer) === equation.answer) {
            setFeedback('✅ Correct!');
            setScore(score + 10);
            setTimeout(generateEquation, 1500);
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
            title="Equation Solver"
            onBack={onBack}
            score={score}
            instructions="Solve for x!"
        >
            <div className="equation-solver-container">
                <div className="equation-display glass-card">
                    <div className="equation-text">{equation.text}</div>
                </div>

                <div className="solve-section">
                    <label>x =</label>
                    <input
                        type="number"
                        className="equation-input glass-card"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="?"
                        autoFocus
                    />
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Solve
                    </button>
                </div>

                {feedback && (
                    <div className={`feedback ${feedback.includes('✅') ? 'correct' : 'incorrect'}`}>
                        {feedback}
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default EquationSolver;
