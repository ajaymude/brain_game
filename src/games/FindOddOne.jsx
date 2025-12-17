import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './FindOddOne.css';

const shapes = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠', '⭐', '❤️', '💎', '🔶'];
const animals = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯'];
const fruits = ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍑', '🍒', '🍍'];

const categories = {
    Shapes: shapes,
    Animals: animals,
    Fruits: fruits
};

const FindOddOne = ({ onBack }) => {
    const [items, setItems] = useState([]);
    const [oddIndex, setOddIndex] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(45);
    const [gameOver, setGameOver] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [currentCategory, setCurrentCategory] = useState('Shapes');
    const [round, setRound] = useState(0);

    useEffect(() => {
        generateRound();
    }, []);

    useEffect(() => {
        if (timeLeft > 0 && !gameOver) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setGameOver(true);
        }
    }, [timeLeft, gameOver]);

    const generateRound = () => {
        const categoryKeys = Object.keys(categories);
        const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
        const pool = categories[randomCategory];

        // Select a common item and an odd one
        const commonItem = pool[Math.floor(Math.random() * pool.length)];
        let oddItem;
        do {
            oddItem = pool[Math.floor(Math.random() * pool.length)];
        } while (oddItem === commonItem);

        // Create grid (8-12 items)
        const gridSize = Math.floor(Math.random() * 5) + 8; // 8-12 items
        const oddPosition = Math.floor(Math.random() * gridSize);

        const newItems = Array.from({ length: gridSize }, (_, i) =>
            i === oddPosition ? oddItem : commonItem
        );

        setItems(newItems);
        setOddIndex(oddPosition);
        setCurrentCategory(randomCategory);
        setRound(round + 1);
    };

    const handleItemClick = (index) => {
        if (gameOver) return;

        if (index === oddIndex) {
            setScore(score + 10);
            setFeedback('✅ Correct!');
            setTimeout(() => {
                generateRound();
                setFeedback('');
            }, 500);
        } else {
            setScore(Math.max(0, score - 3));
            setFeedback('❌ Try again!');
            setTimeout(() => setFeedback(''), 800);
        }
    };

    const resetGame = () => {
        setScore(0);
        setTimeLeft(45);
        setGameOver(false);
        setRound(0);
        setFeedback('');
        generateRound();
    };

    return (
        <GameLayout
            title="Find the Odd One Out"
            onBack={onBack}
            score={score}
            timer={timeLeft}
            instructions="Quickly find and click the item that's different from the others!"
        >
            <div className="findodd-container">
                {gameOver ? (
                    <div className="game-over-message glass-card fade-in">
                        <h2>⏱️ Time's Up!</h2>
                        <p className="final-score">Final Score: {score}</p>
                        <p className="rounds-completed">Rounds Completed: {round}</p>
                        <button className="btn btn-primary" onClick={resetGame}>
                            Play Again
                        </button>
                    </div>
                ) : (
                    <div className="findodd-game">
                        <div className="round-info">
                            Round {round} - {currentCategory}
                        </div>

                        {feedback && (
                            <div className={`feedback ${feedback.includes('✅') ? 'correct' : 'incorrect'}`}>
                                {feedback}
                            </div>
                        )}

                        <div className="items-grid">
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className="item-box glass-card"
                                    onClick={() => handleItemClick(index)}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default FindOddOne;
