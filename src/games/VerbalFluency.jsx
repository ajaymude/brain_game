import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './VerbalFluency.css';

const categories = ['Animals', 'Countries', 'Foods', 'Colors', 'Sports'];

const VerbalFluency = ({ onBack }) => {
    const [category, setCategory] = useState('');
    const [words, setWords] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const [gameActive, setGameActive] = useState(false);
    const [score, setScore] = useState(0);

    const startGame = () => {
        const cat = categories[Math.floor(Math.random() * categories.length)];
        setCategory(cat);
        setWords([]);
        setScore(0);
        setGameActive(true);
        setTimeLeft(60);

        const timer = setInterval(() => {
            setTimeLeft(t => {
                if (t <= 1) {
                    clearInterval(timer);
                    setGameActive(false);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
    };

    const handleSubmit = () => {
        const word = userInput.trim().toUpperCase();
        if (word && !words.includes(word)) {
            setWords([...words, word]);
            setScore(score + 5);
        }
        setUserInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <GameLayout
            title="Verbal Fluency"
            onBack={onBack}
            score={score}
            timer={gameActive ? timeLeft : null}
            instructions="Name as many items in the category as you can!"
        >
            <div className="verbal-fluency-container">
                {!gameActive && timeLeft === 60 ? (
                    <div className="start-screen">
                        <button className="btn btn-primary start-btn" onClick={startGame}>
                            Start Test
                        </button>
                    </div>
                ) : gameActive ? (
                    <>
                        <div className="category-display glass-card">
                            Category: <span>{category}</span>
                        </div>
                        <div className="words-count">Words: {words.length}</div>
                        <div className="words-list">
                            {words.map((w, i) => <span key={i} className="word-tag">{w}</span>)}
                        </div>
                        <div className="input-section">
                            <input
                                type="text"
                                className="word-input glass-card"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type a word..."
                                autoFocus
                            />
                            <button className="btn btn-primary" onClick={handleSubmit}>Add</button>
                        </div>
                    </>
                ) : (
                    <div className="results glass-card">
                        <h2>Time's Up!</h2>
                        <p>You named {words.length} {category.toLowerCase()}</p>
                        <div className="final-words">
                            {words.map((w, i) => <span key={i}>{w}</span>)}
                        </div>
                        <button className="btn btn-primary" onClick={startGame}>Try Again</button>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default VerbalFluency;
