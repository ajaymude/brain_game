import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './WordChain.css';

const words = ['APPLE', 'ELEPHANT', 'TIGER', 'RABBIT', 'TABLE'];

const WordChain = ({ onBack }) => {
    const [chain, setChain] = useState([words[0]]);
    const [userWord, setUserWord] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const handleSubmit = () => {
        const lastWord = chain[chain.length - 1];
        const lastLetter = lastWord[lastWord.length - 1];

        if (userWord.length > 0 && userWord[0].toUpperCase() === lastLetter) {
            setChain([...chain, userWord.toUpperCase()]);
            setScore(score + 5);
            setUserWord('');
            setFeedback('✅ Good!');
            setTimeout(() => setFeedback(''), 1000);
        } else {
            setFeedback(`❌ Must start with ${lastLetter}`);
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout
            title="Word Chain"
            onBack={onBack}
            score={score}
            instructions="Make a word chain! Next word starts with last letter."
        >
            <div className="word-chain-container">
                <div className="chain-display glass-card">
                    {chain.map((w, i) => (
                        <div key={i} className="chain-word">{w}</div>
                    ))}
                </div>

                <div className="input-section">
                    <input
                        type="text"
                        className="word-input glass-card"
                        value={userWord}
                        onChange={(e) => setUserWord(e.target.value.toUpperCase())}
                        placeholder="Next word"
                        autoFocus
                    />
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        Add
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

export default WordChain;
