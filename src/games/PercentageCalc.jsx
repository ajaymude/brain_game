import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './PercentageCalc.css';

const PercentageCalc = ({ onBack }) => {
    const [problem, setProblem] = useState({ question: '', answer: 0 });
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        generateProblem();
    }, []);

    const generateProblem = () => {
        const percent = [10, 20, 25, 50, 75][Math.floor(Math.random() * 5)];
        const number = Math.floor(Math.random() * 90) + 10;
        const answer = (percent / 100) * number;

        setProblem({ question: `${percent}% of ${number}`, answer });
        setUserAnswer('');
        setFeedback('');
    };

    const handleSubmit = () => {
        if (parseFloat(userAnswer) === problem.answer) {
            setFeedback('✅ Correct!');
            setScore(score + 5);
            setTimeout(generateProblem, 1500);
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
            title="Percentage Calculator"
            onBack={onBack}
            score={score}
            instructions="Calculate the percentage quickly!"
        >
            <div className="percentage-container">
                <div className="problem-display glass-card">
                    <div className="problem-text">{problem.question} = ?</div>
                </div>

                <div className="answer-section">
                    <input
                        type="number"
                        className="percentage-input glass-card"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Answer"
                        step="0.1"
                        autoFocus
                    />
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Submit
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

export default PercentageCalc;
