import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './CountingGame.css';

const CountingGame = ({ onBack }) => {
    const [objects, setObjects] = useState([]);
    const [count, setCount] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const emojis = ['⭐', '🔵', '❤️', '🟢', '🔷'];

    useState(() => {
        generateChallenge();
    }, []);

    const generateChallenge = () => {
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        const quantity = Math.floor(Math.random() * 20) + 5;
        const grid = Array(quantity).fill(emoji);

        setObjects(grid);
        setCount(quantity);
        setUserAnswer('');
        setFeedback('');
    };

    const handleSubmit = () => {
        if (parseInt(userAnswer) === count) {
            setFeedback('✅ Correct!');
            setScore(score + 5);
            setTimeout(generateChallenge, 1500);
        } else {
            setFeedback('❌ Wrong!');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <GameLayout
            title="Counting Game"
            onBack={onBack}
            score={score}
            instructions="Count the objects quickly!"
        >
            <div className="counting-container">
                <div className="objects-grid glass-card">
                    {objects.map((obj, idx) => (
                        <div key={idx} className="count-object">
                            {obj}
                        </div>
                    ))}
                </div>

                <div className="answer-section">
                    <label>Count:</label>
                    <input
                        type="number"
                        className="count-input glass-card"
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

export default CountingGame;
