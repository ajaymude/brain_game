import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './DigitSpan.css';

const DigitSpan = ({ onBack }) => {
    const [sequence, setSequence] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isShowingSequence, setIsShowingSequence] = useState(false);
    const [currentDigit, setCurrentDigit] = useState(null);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(3); // Start with 3 digits
    const [mode, setMode] = useState('forward'); // forward or backward
    const [gameOver, setGameOver] = useState(false);
    const [feedback, setFeedback] = useState('');

    const startRound = () => {
        const newSequence = Array.from({ length: level }, () =>
            Math.floor(Math.random() * 10)
        );
        setSequence(newSequence);
        setUserInput('');
        setFeedback('');
        showSequence(newSequence);
    };

    const showSequence = async (seq) => {
        setIsShowingSequence(true);

        for (let i = 0; i < seq.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 500));
            setCurrentDigit(seq[i]);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setCurrentDigit(null);
        }

        setIsShowingSequence(false);
    };

    const checkAnswer = () => {
        if (!userInput) return;

        const expectedSequence = mode === 'forward'
            ? sequence.join('')
            : sequence.reverse().join('');

        if (userInput === expectedSequence) {
            setFeedback('✅ Correct!');
            setScore(score + level * 10);
            setLevel(level + 1);
            setTimeout(() => {
                startRound();
            }, 1500);
        } else {
            setFeedback(`❌ Wrong! Correct: ${expectedSequence}`);
            setGameOver(true);
        }
    };

    const startGame = () => {
        setLevel(3);
        setScore(0);
        setGameOver(false);
        setFeedback('');
        startRound();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isShowingSequence) {
            checkAnswer();
        }
    };

    return (
        <GameLayout
            title="Digit Span Test"
            onBack={onBack}
            score={score}
            instructions={`Remember the digits and type them ${mode === 'forward' ? 'in order' : 'in reverse'}!`}
        >
            <div className="digit-span-container">
                {!isShowingSequence && sequence.length === 0 && (
                    <div className="start-screen">
                        <div className="mode-selector">
                            <button
                                className={`btn ${mode === 'forward' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setMode('forward')}
                            >
                                Forward
                            </button>
                            <button
                                className={`btn ${mode === 'backward' ? 'btn-primary' : 'btn-secondary'}`}
                                onClick={() => setMode('backward')}
                            >
                                Backward
                            </button>
                        </div>
                        <button className="btn btn-primary start-btn" onClick={startGame}>
                            Start Test
                        </button>
                        <div className="instructions">
                            <p>{mode === 'forward'
                                ? 'Watch the digits and type them in the same order'
                                : 'Watch the digits and type them in reverse order'
                            }</p>
                        </div>
                    </div>
                )}

                {isShowingSequence && (
                    <div className="digit-display glass-card">
                        <div className="display-label">Remember:</div>
                        {currentDigit !== null && (
                            <div className="current-digit fade-in">
                                {currentDigit}
                            </div>
                        )}
                    </div>
                )}

                {!isShowingSequence && sequence.length > 0 && !gameOver && (
                    <div className="input-section">
                        <div className="level-info">
                            Level {level} - {level} Digits ({mode})
                        </div>
                        <input
                            type="text"
                            className="digit-input glass-card"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value.replace(/\D/g, ''))}
                            onKeyPress={handleKeyPress}
                            placeholder="Type the digits..."
                            maxLength={level}
                            autoFocus
                        />
                        <button className="btn btn-primary" onClick={checkAnswer}>
                            Submit
                        </button>
                    </div>
                )}

                {feedback && (
                    <div className={`feedback ${feedback.includes('✅') ? 'correct' : 'incorrect'}`}>
                        {feedback}
                    </div>
                )}

                {gameOver && (
                    <div className="game-over-message glass-card fade-in">
                        <h2>Test Complete!</h2>
                        <p className="final-score">Final Score: {score}</p>
                        <p className="max-level">Max Level Reached: {level - 1}</p>
                        <div className="rating">
                            {level - 1 < 5 && '👍 Good start!'}
                            {level - 1 >= 5 && level - 1 < 7 && '⭐ Great memory!'}
                            {level - 1 >= 7 && level - 1 < 9 && '🌟 Excellent!'}
                            {level - 1 >= 9 && '🏆 Outstanding!'}
                        </div>
                        <button className="btn btn-primary" onClick={startGame}>
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default DigitSpan;
