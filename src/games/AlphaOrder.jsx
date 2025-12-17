import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './AlphaOrder.css';

const AlphaOrder = ({ onBack }) => {
    const [letters, setLetters] = useState([]);
    const [answer, setAnswer] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        generateProblem();
    }, []);

    const generateProblem = () => {
        const len = 5;
        const randomLetters = Array.from({ length: len }, () =>
            String.fromCharCode(65 + Math.floor(Math.random() * 26))
        );
        const sorted = [...randomLetters].sort().join('');

        setLetters(randomLetters);
        setAnswer(sorted);
        setUserAnswer('');
        setFeedback('');
    };

    const handleSubmit = () => {
        if (userAnswer.toUpperCase() === answer) {
            setFeedback('✅ Correct!');
            setScore(score + 10);
            setTimeout(generateProblem, 1500);
        } else {
            setFeedback(`❌ Wrong! It was ${answer}`);
            setTimeout(() => setFeedback(''), 2000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <GameLayout
            title="Alphabetical Order"
            onBack={onBack}
            score={score}
            instructions="Put the letters in alphabetical order!"
        >
            <div className="alpha-order-container">
                <div className="letters-display glass-card">
                    {letters.map((letter, idx) => (
                        <div key={idx} className="letter-box">{letter}</div>
                    ))}
                </div>

                <div className="answer-section">
                    <input
                        type="text"
                        className="alpha-input glass-card"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value.toUpperCase())}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter in order"
                        maxLength={5}
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

export default AlphaOrder;
