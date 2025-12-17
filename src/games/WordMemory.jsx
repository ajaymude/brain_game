import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './WordMemory.css';

const wordLists = [
    ['APPLE', 'CHAIR', 'GUITAR', 'OCEAN', 'MOUNTAIN', 'TIGER', 'ROCKET', 'PIANO'],
    ['COFFEE', 'WINDOW', 'GARDEN', 'THUNDER', 'BUTTON', 'CRYSTAL', 'LAPTOP', 'BASKET'],
    ['FOREST', 'MARBLE', 'SUNSET', 'DRAGON', 'CASTLE', 'SPIDER', 'LANTERN', 'BRIDGE']
];

const WordMemory = ({ onBack }) => {
    const [words, setWords] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [recalled, setRecalled] = useState([]);
    const [phase, setPhase] = useState('start');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);

    const startGame = () => {
        const randomList = wordLists[Math.floor(Math.random() * wordLists.length)];
        setWords(randomList);
        setRecalled([]);
        setUserInput('');
        setPhase('showing');

        setTimeout(() => {
            setPhase('recall');
            const timer = setInterval(() => {
                setTimeLeft(t => {
                    if (t <= 1) {
                        clearInterval(timer);
                        endGame();
                        return 0;
                    }
                    return t - 1;
                });
            }, 1000);
        }, 10000);
    };

    const handleSubmit = () => {
        const word = userInput.toUpperCase().trim();
        if (word && words.includes(word) && !recalled.includes(word)) {
            setRecalled([...recalled, word]);
            setScore(score + 10);
        }
        setUserInput('');
    };

    const endGame = () => {
        setPhase('result');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <GameLayout
            title="Word Memory"
            onBack={onBack}
            score={score}
            timer={phase === 'recall' ? timeLeft : null}
            instructions="Memorize the words, then recall as many as you can!"
        >
            <div className="word-memory-container">
                {phase === 'start' && (
                    <div className="start-screen">
                        <button className="btn btn-primary start-btn" onClick={startGame}>
                            Start Game
                        </button>
                        <p className="info">You'll have 10 seconds to memorize words, then 30 seconds to recall them!</p>
                    </div>
                )}

                {phase === 'showing' && (
                    <div className="showing-phase">
                        <div className="instruction">Memorize these words!</div>
                        <div className="words-grid">
                            {words.map((word, idx) => (
                                <div key={idx} className="word-card fade-in">
                                    {word}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {phase === 'recall' && (
                    <div className="recall-phase">
                        <div className="stats">Recalled: {recalled.length}/{words.length}</div>
                        <div className="recalled-words">
                            {recalled.map((word, idx) => (
                                <span key={idx} className="recalled-word">{word}</span>
                            ))}
                        </div>
                        <input
                            type="text"
                            className="word-input glass-card"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a word..."
                            autoFocus
                        />
                        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                )}

                {phase === 'result' && (
                    <div className="result-screen glass-card">
                        <h2>Time's Up!</h2>
                        <p>You recalled {recalled.length} out of {words.length} words</p>
                        <p>Accuracy: {Math.round((recalled.length / words.length) * 100)}%</p>
                        <div className="missed-words">
                            <h3>You missed:</h3>
                            {words.filter(w => !recalled.includes(w)).map((w, i) => (
                                <span key={i}>{w}</span>
                            ))}
                        </div>
                        <button className="btn btn-primary" onClick={startGame}>Play Again</button>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default WordMemory;
