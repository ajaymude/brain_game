import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './MemoryGame.css';

const emojis = ['🧠', '🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎺'];

const MemoryGame = ({ onBack }) => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const shuffled = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({ id: index, emoji, matched: false }));
        setCards(shuffled);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setGameWon(false);
    };

    const handleCardClick = (index) => {
        if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
            return;
        }

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(moves + 1);
            const [first, second] = newFlipped;

            if (cards[first].emoji === cards[second].emoji) {
                setMatched([...matched, first, second]);
                setFlipped([]);

                if (matched.length + 2 === cards.length) {
                    setTimeout(() => setGameWon(true), 500);
                }
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    return (
        <GameLayout
            title="Memory Match"
            onBack={onBack}
            score={moves}
            instructions="Find all matching pairs! Click cards to flip them and match identical emojis."
        >
            <div className="memory-game-container">
                {gameWon && (
                    <div className="win-message glass-card fade-in">
                        <h2>🎉 Congratulations!</h2>
                        <p>You won in {moves} moves!</p>
                        <button className="btn btn-primary" onClick={initializeGame}>
                            Play Again
                        </button>
                    </div>
                )}

                <div className="memory-grid">
                    {cards.map((card, index) => (
                        <div
                            key={card.id}
                            className={`memory-card ${flipped.includes(index) || matched.includes(index) ? 'flipped' : ''
                                } ${matched.includes(index) ? 'matched' : ''}`}
                            onClick={() => handleCardClick(index)}
                        >
                            <div className="card-inner">
                                <div className="card-front glass-card">?</div>
                                <div className="card-back glass-card">{card.emoji}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </GameLayout>
    );
};

export default MemoryGame;
