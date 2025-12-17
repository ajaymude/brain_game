import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './DigitReversal.css';

const DigitReversal = ({ onBack }) => {
    const [digits, setDigits] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        generateDigits();
    }, []);

    const generateDigits = () => {
        const len = Math.random() < 0.5 ? 4 : 5;
        const num = Math.floor(Math.random() * Math.pow(10, len)).toString().padStart(len, '0');
        setDigits(num);
        setUserAnswer('');
        setFeedback('');
    };

    const handleSubmit = () => {
        const reversed = digits.split('').reverse().join('');
        if (userAnswer === reversed) {
            setFeedback('✅ Correct!');
            setScore(score + 10);
            setTimeout(generateDigits, 1500);
        } else {
            setFeedback(`❌ Wrong! It was ${reversed}`);
            setTimeout(() => setFeedback(''), 2000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <GameLayout
            title="Digit Reversal"
            onBack={onBack}
            score={score}
            instructions="Reverse the digits!"
        >
            <div className="digit-reversal-container">
                <div className="digits-display glass-card">
                    <div className="digits">{digits}</div>
                </div>

                <div className="answer-section">
                    <input
                        type="text"
                        className="digits-input glass-card"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Reversed"
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

export default DigitReversal;
