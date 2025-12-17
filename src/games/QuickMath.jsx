import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './QuickMath.css';

const QuickMath = ({ onBack }) => {
    const [problem, setProblem] = useState({ question: '', answer: 0 });
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [round, setRound] = useState(0);
    const [feedback, setFeedback] = useState('');

    useState(() => {
        generateProblem();
    }, []);

    const generateProblem = () => {
        const ops = ['+', '-', '×'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        const a = Math.floor(Math.random() * 20) + 1;
        const b = Math.floor(Math.random() * 15) + 1;

        let answer;
        let question;

        if (op === '+') {
            answer = a + b;
            question = `${a} + ${b}`;
        } else if (op === '-') {
            const max = Math.max(a, b);
            const min = Math.min(a, b);
            answer = max - min;
            question = `${max} - ${min}`;
        } else {
            answer = a * b;
            question = `${a} × ${b}`;
        }

        setProblem({ question, answer });
        setUserAnswer('');
        setRound(round + 1);
        setFeedback('');
    };

    const handleSubmit = () => {
        if (parseInt(userAnswer) === problem.answer) {
            setFeedback('✅');
            setScore(score + 5 + streak);
            setStreak(streak + 1);
            setTimeout(generateProblem, 500);
        } else {
            setFeedback('❌');
            setStreak(0);
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <GameLayout
            title="Quick Math"
            onBack={onBack}
            score={score}
            instructions="Solve math problems as fast as you can!"
        >
            <div className="quick-math-container">
                <div className="problem-display glass-card">
                    <div className="problem-text">{problem.question} = ?</div>
                </div>

                {streak > 2 && <div className="streak-display">🔥 {streak} Streak!</div>}

                <div className="answer-section">
                    <input
                        type="number"
                        className="math-input glass-card"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Answer"
                        autoFocus
                    />
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>

                {feedback && <div className="feedback-icon">{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default QuickMath;
