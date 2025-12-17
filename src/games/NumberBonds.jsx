import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './NumberBonds.css';

const NumberBonds = ({ onBack }) => {
    const [target, setTarget] = useState(10);
    const [firstNum, setFirstNum] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);
    const [feedback, setFeedback] = useState('');

    useState(() => {
        generateProblem();
    }, []);

    const generateProblem = () => {
        const t = [10, 20, 50, 100][Math.floor(Math.random() * 4)];
        const n = Math.floor(Math.random() * (t - 1)) + 1;
        setTarget(t);
        setFirstNum(n);
        setUserAnswer('');
        setRound(round + 1);
        setFeedback('');
    };

    const handleSubmit = () => {
        const answer = parseInt(userAnswer);
        if (answer === target - firstNum) {
            setFeedback('✅ Correct!');
            setScore(score + 5);
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
            title="Number Bonds"
            onBack={onBack}
            score={score}
            instructions="Find the number that adds up to the target!"
        >
            <div className="number-bonds-container">
                <div className="bonds-display glass-card">
                    <div className="equation">
                        <span className="first-number">{firstNum}</span>
                        <span className="operator">+</span>
                        <span className="mystery">?</span>
                        <span className="equals">=</span>
                        <span className="target-number">{target}</span>
                    </div>
                </div>

                <div className="answer-section">
                    <input
                        type="number"
                        className="bonds-input glass-card"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="?"
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

export default NumberBonds;
