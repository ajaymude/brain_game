import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './CardMemory.css';

const suits = ['♠️', '♥️', '♣️', '♦️'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const CardMemory = ({ onBack }) => {
    const [cards, setCards] = useState([]);
    const [isShowingCards, setIsShowingCards] = useState(false);
    const [userGuesses, setUserGuesses] = useState([]);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(3);
    const [gamePhase, setGamePhase] = useState('start'); // start, showing, guessing, result

    const generateCards = (count) => {
        const deck = [];
        for (let suit of suits) {
            for (let value of values) {
                deck.push({ suit, value, display: `${value}${suit}` });
            }
        }

        // Shuffle and pick random cards
        const shuffled = deck.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    };

    const startRound = () => {
        const newCards = generateCards(level);
        setCards(newCards);
        setUserGuesses([]);
        setGamePhase('showing');
        setIsShowingCards(true);

        // Hide cards after 3 seconds
        setTimeout(() => {
            setIsShowingCards(false);
            setGamePhase('guessing');
        }, 3000 + (level * 500));
    };

    const handleCardGuess = (card) => {
        if (userGuesses.some(g => g.display === card.display)) return;

        const newGuesses = [...userGuesses, card];
        setUserGuesses(newGuesses);

        if (newGuesses.length === level) {
            checkAnswers(newGuesses);
        }
    };

    const checkAnswers = (guesses) => {
        let correct = 0;
        for (let card of cards) {
            if (guesses.some(g => g.display === card.display)) {
                correct++;
            }
        }

        const accuracy = (correct / level) * 100;
        const points = Math.floor(accuracy);
        setScore(score + points);
        setGamePhase('result');

        if (accuracy === 100) {
            setTimeout(() => {
                setLevel(Math.min(level + 1, 10));
                startRound();
            }, 2000);
        }
    };

    const allCards = generateCards(52).slice(0, 20); // Show subset for selection

    return (
        <GameLayout
            title="Card Memory"
            onBack={onBack}
            score={score}
            instructions="Remember the cards shown, then select them from the deck!"
        >
            <div className="card-memory-container">
                {gamePhase === 'start' && (
                    <div className="start-screen">
                        <div className="level-info">Level {level} - Remember {level} cards</div>
                        <button className="btn btn-primary start-btn" onClick={startRound}>
                            Start Round
                        </button>
                    </div>
                )}

                {gamePhase === 'showing' && (
                    <div className="showing-phase">
                        <div className="instruction">Memorize these cards!</div>
                        <div className="cards-display">
                            {cards.map((card, idx) => (
                                <div key={idx} className="playing-card fade-in">
                                    <div className="card-value">{card.value}</div>
                                    <div className="card-suit">{card.suit}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {gamePhase === 'guessing' && (
                    <div className="guessing-phase">
                        <div className="instruction">
                            Select the {level} cards you saw ({userGuesses.length}/{level})
                        </div>
                        <div className="selected-cards">
                            {userGuesses.map((card, idx) => (
                                <div key={idx} className="playing-card selected">
                                    <div className="card-value">{card.value}</div>
                                    <div className="card-suit">{card.suit}</div>
                                </div>
                            ))}
                        </div>
                        <div className="deck-selection">
                            {allCards.map((card, idx) => (
                                <div
                                    key={idx}
                                    className={`playing-card small ${userGuesses.some(g => g.display === card.display) ? 'disabled' : ''
                                        }`}
                                    onClick={() => handleCardGuess(card)}
                                >
                                    <div className="card-value-small">{card.value}</div>
                                    <div className="card-suit-small">{card.suit}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {gamePhase === 'result' && (
                    <div className="result-message glass-card fade-in">
                        <h2>Round Complete!</h2>
                        <p>Accuracy: {Math.floor((userGuesses.filter(g =>
                            cards.some(c => c.display === g.display)
                        ).length / level) * 100)}%</p>
                        <button className="btn btn-primary" onClick={startRound}>
                            {userGuesses.filter(g => cards.some(c => c.display === g.display)).length === level
                                ? 'Next Level'
                                : 'Try Again'}
                        </button>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default CardMemory;
