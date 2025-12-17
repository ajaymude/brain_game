import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './PrimeNumbers.css';

const PrimeNumbers = ({ onBack }) => {
    const [number, setNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useState(() => {
        generateNumber();
    }, []);

    const generateNumber = () => {
        setNumber(Math.floor(Math.random() * 98) + 2);
        setFeedback('');
    };

    const isPrime = (n) => {
        if (n < 2) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
        }
        return true;
    };

    const handleAnswer = (answer) => {
        const correct = (answer === 'prime' && isPrime(number)) ||
            (answer === 'composite' && !isPrime(number));

        if (correct) {
            setFeedback('✅ Correct!');
            setScore(score + 5);
            setTimeout(generateNumber, 1000);
        } else {
            setFeedback('❌ Wrong!');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout
            title="Prime Numbers"
            onBack={onBack}
            score={score}
            instructions="Is this number prime or composite?"
        >
            <div className="prime-container">
                <div className="number-display glass-card">
                    <div className="prime-number">{number}</div>
                </div>

                <div className="answer-buttons">
                    <button className="btn btn-primary" onClick={() => handleAnswer('prime')}>
                        PRIME
                    </button>
                    <button className="btn btn-primary" onClick={() => handleAnswer('composite')}>
                        COMPOSITE
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

export default PrimeNumbers;
