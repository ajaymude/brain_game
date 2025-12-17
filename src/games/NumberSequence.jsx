import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './NumberSequence.css';

const sequences = [
    { pattern: [2, 4, 6, 8], answer: 10, hint: 'Even numbers' },
    { pattern: [1, 3, 5, 7], answer: 9, hint: 'Odd numbers' },
    { pattern: [5, 10, 15, 20], answer: 25, hint: 'Multiples of 5' },
    { pattern: [1, 2, 4, 8], answer: 16, hint: 'Powers of 2' },
    { pattern: [3, 6, 9, 12], answer: 15, hint: 'Multiples of 3' },
    { pattern: [10, 20, 30, 40], answer: 50, hint: 'Multiples of 10' },
    { pattern: [1, 4, 9, 16], answer: 25, hint: 'Perfect squares' },
    { pattern: [2, 3, 5, 7], answer: 11, hint: 'Prime numbers' },
];

const NumberSequence = ({ onBack }) => {
    const [currentSequence, setCurrentSequence] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [questionsAnswered, setQuestionsAnswered] = useState(0);

    useEffect(() => {
        loadNewSequence();
    }, []);

    const loadNewSequence = () => {
        const randomSequence = sequences[Math.floor(Math.random() * sequences.length)];
        setCurrentSequence(randomSequence);
        setUserAnswer('');
        setShowHint(false);
        setFeedback('');
    };

    const checkAnswer = () => {
        if (!userAnswer) return;

        const numAnswer = parseInt(userAnswer);
        if (numAnswer === currentSequence.answer) {
            setFeedback('✅ Correct!');
            setScore(score + (showHint ? 5 : 10));
            setQuestionsAnswered(questionsAnswered + 1);
            setTimeout(loadNewSequence, 1500);
        } else {
            setFeedback('❌ Try again!');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    };

    return (
        <GameLayout
            title="Number Sequence"
            onBack={onBack}
            score={score}
            instructions="Find the pattern and complete the sequence!"
        >
            <div className="number-sequence-container">
                {currentSequence && (
                    <div className="sequence-game">
                        <div className="sequence-display glass-card">
                            {currentSequence.pattern.map((num, idx) => (
                                <div key={idx} className="sequence-number fade-in">
                                    {num}
                                </div>
                            ))}
                            <div className="sequence-number answer-slot">
                                ?
                            </div>
                        </div>

                        <div className="answer-section">
                            <input
                                type="number"
                                className="answer-input glass-card"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Your answer"
                                autoFocus
                            />
                            <button className="btn btn-primary" onClick={checkAnswer}>
                                Submit
                            </button>
                        </div>

                        {feedback && (
                            <div className={`feedback ${feedback.includes('✅') ? 'correct' : 'incorrect'}`}>
                                {feedback}
                            </div>
                        )}

                        <div className="hint-section">
                            {!showHint ? (
                                <button className="btn btn-secondary" onClick={() => setShowHint(true)}>
                                    💡 Show Hint (-5 points)
                                </button>
                            ) : (
                                <div className="hint-text fade-in">
                                    Hint: {currentSequence.hint}
                                </div>
                            )}
                        </div>

                        <div className="progress-info">
                            Questions answered: {questionsAnswered}
                        </div>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default NumberSequence;
