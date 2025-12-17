import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './Concentration.css';

const Concentration = ({ onBack }) => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [score, setScore] = useState(0);

    useState(() => {
        initGame();
    }, []);

    const initGame = () => {
        const symbols = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍒', '🥝', '🍑'];
        const deck = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
        setCards(deck.map((symbol, idx) => ({ id: idx, symbol, flipped: false })));
        setFlipped([]);
        setMatched([]);
        setMoves(0);
    };

    const handleCardClick = (idx) => {
        if (flipped.length === 2 || matched.includes(idx) || flipped.includes(idx)) return;

        const newFlipped = [...flipped, idx];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(moves + 1);
            const [first, second] = newFlipped;

            if (cards[first].symbol === cards[second].symbol) {
                setMatched([...matched, first, second]);
                setScore(score + 10);
                setFlipped([]);

                if (matched.length + 2 === cards.length) {
                    setTimeout(() => alert('You won!'), 300);
                }
            } else {
                setTimeout(() => setFlipped([]), 800);
            }
        }
    };

    return (
        <GameLayout
            title="Concentration"
            onBack={onBack}
            score={score}
            instructions="Match pairs of cards by remembering their positions!"
        >
            <div className="concentration-container">
                <div className="stats-bar">Moves: {moves}</div>

                <div className="cards-grid">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className={`conc-card ${flipped.includes(idx) || matched.includes(idx) ? 'flipped' : ''}`}
                            onClick={() => handleCardClick(idx)}
                        >
                            <div className="card-inner">
                                <div className="card-front">?</div>
                                <div className="card-back">{card.symbol}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="btn btn-secondary" onClick={initGame}>
                    New Game
                </button>
            </div>
        </GameLayout>
    );
};

export default Concentration;
