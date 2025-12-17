import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './NBackGame.css';

const NBackGame = ({ onBack }) => {
    const [nLevel, setNLevel] = useState(2); // 2-back by default
    const [sequence, setSequence] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameActive, setGameActive] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [totalRounds, setTotalRounds] = useState(0);
    const [correctResponses, setCorrectResponses] = useState(0);

    const positions = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // 3x3 grid

    useEffect(() => {
        if (gameActive && currentIndex < sequence.length) {
            const timer = setTimeout(() => {
                setCurrentIndex(currentIndex + 1);
                if (currentIndex + 1 >= sequence.length) {
                    endGame();
                }
            }, 2500); // Show each item for 2.5 seconds

            return () => clearTimeout(timer);
        }
    }, [currentIndex, gameActive, sequence]);

    const generateSequence = (length = 20) => {
        const seq = [];
        for (let i = 0; i < length; i++) {
            seq.push(Math.floor(Math.random() * 9));
        }
        return seq;
    };

    const startGame = () => {
        const newSequence = generateSequence(20);
        setSequence(newSequence);
        setCurrentIndex(0);
        setGameActive(true);
        setScore(0);
        setTotalRounds(0);
        setCorrectResponses(0);
        setFeedback('');
    };

    const handleMatch = () => {
        if (!gameActive || currentIndex < nLevel) return;

        setTotalRounds(totalRounds + 1);
        const nBackPosition = sequence[currentIndex - nLevel];
        const currentPosition = sequence[currentIndex];

        if (nBackPosition === currentPosition) {
            setScore(score + 10);
            setCorrectResponses(correctResponses + 1);
            setFeedback('✅ Correct Match!');
        } else {
            setScore(Math.max(0, score - 5));
            setFeedback('❌ No Match');
        }

        setTimeout(() => setFeedback(''), 800);
    };

    const handleNoMatch = () => {
        if (!gameActive || currentIndex < nLevel) return;

        setTotalRounds(totalRounds + 1);
        const nBackPosition = sequence[currentIndex - nLevel];
        const currentPosition = sequence[currentIndex];

        if (nBackPosition !== currentPosition) {
            setScore(score + 5);
            setCorrectResponses(correctResponses + 1);
            setFeedback('✅ Correct!');
        } else {
            setScore(Math.max(0, score - 5));
            setFeedback('❌ Was a Match');
        }

        setTimeout(() => setFeedback(''), 800);
    };

    const endGame = () => {
        setGameActive(false);
    };

    const getAccuracy = () => {
        if (totalRounds === 0) return 0;
        return Math.round((correctResponses / totalRounds) * 100);
    };

    return (
        <GameLayout
            title="N-Back Memory"
            onBack={onBack}
            score={score}
            instructions={`Watch the grid! Press MATCH if the position is the same as ${nLevel} steps back.`}
        >
            <div className="nback-container">
                {!gameActive && sequence.length === 0 && (
                    <div className="nback-start">
                        <div className="difficulty-selector">
                            <label>Difficulty Level:</label>
                            {[1, 2, 3, 4].map(n => (
                                <button
                                    key={n}
                                    className={`btn ${nLevel === n ? 'btn-primary' : 'btn-secondary'}`}
                                    onClick={() => setNLevel(n)}
                                >
                                    {n}-Back
                                </button>
                            ))}
                        </div>
                        <button className="btn btn-primary start-btn" onClick={startGame}>
                            Start Game
                        </button>
                        <div className="game-explanation">
                            <h3>How to Play:</h3>
                            <p>A square will light up in the 3×3 grid. Your task is to remember if the current position matches the position from {nLevel} steps back.</p>
                            <p>Press <strong>MATCH</strong> if it's the same position, or <strong>NO MATCH</strong> if it's different.</p>
                        </div>
                    </div>
                )}

                {gameActive && (
                    <div className="nback-game">
                        <div className="nback-info">
                            Round: {currentIndex + 1} / {sequence.length} | Accuracy: {getAccuracy()}%
                        </div>

                        <div className="nback-grid">
                            {positions.map(pos => (
                                <div
                                    key={pos}
                                    className={`grid-cell ${currentIndex < sequence.length && sequence[currentIndex] === pos ? 'active' : ''}`}
                                ></div>
                            ))}
                        </div>

                        {feedback && (
                            <div className={`feedback ${feedback.includes('✅') ? 'correct' : 'incorrect'}`}>
                                {feedback}
                            </div>
                        )}

                        {currentIndex >= nLevel && (
                            <div className="nback-buttons">
                                <button className="btn match-btn" onClick={handleMatch}>
                                    ✓ MATCH
                                </button>
                                <button className="btn nomatch-btn" onClick={handleNoMatch}>
                                    ✗ NO MATCH
                                </button>
                            </div>
                        )}

                        {currentIndex < nLevel && (
                            <div className="wait-message">
                                Wait for {nLevel} items before responding...
                            </div>
                        )}
                    </div>
                )}

                {!gameActive && sequence.length > 0 && (
                    <div className="nback-results glass-card">
                        <h2>Game Complete!</h2>
                        <div className="results-stats">
                            <div className="result-item">
                                <span className="result-label">Final Score:</span>
                                <span className="result-value">{score}</span>
                            </div>
                            <div className="result-item">
                                <span className="result-label">Accuracy:</span>
                                <span className="result-value">{getAccuracy()}%</span>
                            </div>
                            <div className="result-item">
                                <span className="result-label">Correct:</span>
                                <span className="result-value">{correctResponses}/{totalRounds}</span>
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={startGame}>
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default NBackGame;
