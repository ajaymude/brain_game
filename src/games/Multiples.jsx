import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './Multiples.css';

const Multiples = ({ onBack }) => {
    const [number, setNumber] = useState(0);
    const [base, setBase] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useState(() => {
        generateProblem();
    }, []);

    const generateProblem = () => {
        const b = [2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 8)];
        const n = Math.floor(Math.random() * 50) + 1;
        setBase(b);
        setNumber(n);
        setFeedback('');
    };

    const handleAnswer = (answer) => {
        const isMultiple = number % base === 0;
        const correct = (answer === 'yes' && isMultiple) || (answer === 'no' && !isMultiple);

        if (correct) {
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
            title="Multiples"
            onBack={onBack}
            score={score}
            instructions={`Is the number a multiple of ${base}?`}
        >
            <div className="multiples-container">
                <div className="number-display glass-card">
                    <div className="big-number">{number}</div>
                    <div className="question">Multiple of {base}?</div>
                </div>

                <div className="answer-buttons">
                    <button className="btn btn-primary" onClick={() => handleAnswer('yes')}>
                        YES
                    </button>
                    <button className="btn btn-primary" onClick={() => handleAnswer('no')}>
                        NO
                    </button>
                </div>

                {feedback && <div className="feedback-icon">{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default Multiples;
