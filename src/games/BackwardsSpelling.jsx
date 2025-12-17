import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './BackwardsSpelling.css';

const words = ['HELLO', 'WORLD', 'BRAIN', 'GAME', 'POWER', 'SMART', 'THINK', 'LEARN'];

const BackwardsSpelling = ({ onBack }) => {
    const [word, setWord] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useState(() => {
        generateWord();
    }, []);

    const generateWord = () => {
        setWord(words[Math.floor(Math.random() * words.length)]);
        setUserAnswer('');
        setFeedback('');
    };

    const handleSubmit = () => {
        const reversed = word.split('').reverse().join('');
        if (userAnswer.toUpperCase() === reversed) {
            setFeedback('✅ Correct!');
            setScore(score + 10);
            setTimeout(generateWord, 1500);
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
            title="Backwards Spelling"
            onBack={onBack}
            score={score}
            instructions="Spell the word backwards!"
        >
            <div className="backwards-container">
                <div className="word-display glass-card">
                    <div className="target-word">{word}</div>
                </div>

                <div className="answer-section">
                    <input
                        type="text"
                        className="backwards-input glass-card"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value.toUpperCase())}
                        onKeyPress={handleKeyPress}
                        placeholder="Spell it backwards"
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

export default BackwardsSpelling;
