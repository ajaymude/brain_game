import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './MissingNumbers.css';

const MissingNumbers = ({ onBack }) => {
    const [sequence, setSequence] = useState([]);
    const [missing, setMissing] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        generateSequence();
    }, []);

    const generateSequence = () => {
        const type = Math.random();
        let seq = [];
        let missingNum = 0;

        if (type < 0.5) {
            // Arithmetic sequence
            const start = Math.floor(Math.random() * 10) + 1;
            const step = Math.floor(Math.random() * 5) + 1;
            for (let i = 0; i < 7; i++) {
                seq.push(start + i * step);
            }
            const missingIdx = Math.floor(Math.random() * 7);
            missingNum = seq[missingIdx];
            seq[missingIdx] = '?';
        } else {
            // Even/odd sequence
            const start = Math.floor(Math.random() * 10) + 1;
            for (let i = 0; i < 7; i++) {
                seq.push(start + i * 2);
            }
            const missingIdx = Math.floor(Math.random() * 7);
            missingNum = seq[missingIdx];
            seq[missingIdx] = '?';
        }

        setSequence(seq);
        setMissing(missingNum);
        setUserAnswer('');
        setRound(round + 1);
        setFeedback('');
    };

    const handleSubmit = () => {
        if (parseInt(userAnswer) === missing) {
            setFeedback('✅ Correct!');
            setScore(score + 10);
            setTimeout(generateSequence, 1500);
        } else {
            setFeedback(`❌ Wrong! It was ${missing}`);
            setTimeout(() => setFeedback(''), 2000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <GameLayout
            title="Missing Numbers"
            onBack={onBack}
            score={score}
            instructions="Find the missing number in the sequence!"
        >
            <div className="missing-numbers-container">
                <div className="round-info">Round {round}</div>

                <div className="sequence-display glass-card">
                    {sequence.map((num, idx) => (
                        <div key={idx} className={`number-box ${num === '?' ? 'missing' : ''}`}>
                            {num}
                        </div>
                    ))}
                </div>

                <div className="answer-section">
                    <input
                        type="number"
                        className="answer-input glass-card"
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

export default MissingNumbers;
