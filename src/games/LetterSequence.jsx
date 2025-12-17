import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './LetterSequence.css';

const LetterSequence = ({ onBack }) => {
    const [sequence, setSequence] = useState('');
    const [answer, setAnswer] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        generateSequence();
    }, []);

    const generateSequence = () => {
        const type = Math.random();
        let seq = '';
        let ans = '';

        if (type < 0.33) {
            // Alphabet sequence
            const start = Math.floor(Math.random() * 20) + 65;
            seq = String.fromCharCode(start, start + 1, start + 2, start + 3);
            ans = String.fromCharCode(start + 4);
        } else if (type < 0.66) {
            // Skip pattern
            const start = Math.floor(Math.random() * 20) + 65;
            seq = String.fromCharCode(start, start + 2, start + 4, start + 6);
            ans = String.fromCharCode(start + 8);
        } else {
            // Vowels/Consonants
            const vowels = 'AEIOU';
            const idx = Math.floor(Math.random() * 2);
            seq = vowels.substring(idx, idx + 4);
            ans = vowels[idx + 4] || vowels[0];
        }

        setSequence(seq);
        setAnswer(ans);
        setUserAnswer('');
        setRound(round + 1);
        setFeedback('');
    };

    const handleSubmit = () => {
        if (userAnswer.toUpperCase() === answer) {
            setFeedback('✅ Correct!');
            setScore(score + 10);
            setTimeout(generateSequence, 1500);
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
            title="Letter Sequence"
            onBack={onBack}
            score={score}
            instructions="Find the next letter in the sequence!"
        >
            <div className="letter-sequence-container">
                <div className="sequence-display glass-card">
                    {sequence.split('').map((letter, idx) => (
                        <div key={idx} className="letter-box">{letter}</div>
                    ))}
                    <div className="letter-box mystery">?</div>
                </div>

                <div className="answer-section">
                    <input
                        type="text"
                        className="letter-input glass-card"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value.toUpperCase())}
                        onKeyPress={handleKeyPress}
                        placeholder="?"
                        maxLength={1}
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

export default LetterSequence;
