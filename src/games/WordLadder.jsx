import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './WordLadder.css';

const puzzles = [
    { start: 'COLD', end: 'WARM', solution: ['COLD', 'CORD', 'CARD', 'WARD', 'WARM'] },
    { start: 'HEAD', end: 'TAIL', solution: ['HEAD', 'HEAL', 'TEAL', 'TELL', 'TALL', 'TAIL'] },
    { start: 'STONE', end: 'MONEY', solution: ['STONE', 'SHONE', 'PHONE', 'PHONY', 'PEONY', 'PENNY', 'PANNY', 'MONEY'] },
    { start: 'HATE', end: 'LOVE', solution: ['HATE', 'HAVE', 'HOVE', 'LOVE'] },
    { start: 'DARK', end: 'DAWN', solution: ['DARK', 'DARN', 'DAWN'] },
    { start: 'FLOUR', end: 'BREAD', solution: ['FLOUR', 'FLOOR', 'FLOOD', 'BLOOD', 'BROOD', 'BROAD', 'BREAD'] },
    { start: 'SLEEP', end: 'DREAM', solution: ['SLEEP', 'BLEEP', 'BLEED', 'BREED', 'CREED', 'CREEK', 'CREAK', 'CREAM', 'DREAM'] }
];

const WordLadder = ({ onBack }) => {
    const [currentPuzzle, setCurrentPuzzle] = useState(puzzles[0]);
    const [ladder, setLadder] = useState([currentPuzzle.start]);
    const [currentWord, setCurrentWord] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [completed, setCompleted] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const isOneLetterDifferent = (word1, word2) => {
        if (word1.length !== word2.length) return false;
        let differences = 0;
        for (let i = 0; i < word1.length; i++) {
            if (word1[i] !== word2[i]) differences++;
        }
        return differences === 1;
    };

    const isValidWord = (word) => {
        // Simple validation - in real app would check against dictionary
        return word.length === currentPuzzle.start.length && /^[A-Z]+$/.test(word);
    };

    const handleSubmit = () => {
        const word = currentWord.toUpperCase();

        if (!isValidWord(word)) {
            setFeedback('❌ Invalid word format');
            setTimeout(() => setFeedback(''), 1500);
            return;
        }

        const lastWord = ladder[ladder.length - 1];

        if (!isOneLetterDifferent(lastWord, word)) {
            setFeedback('❌ Must change only one letter');
            setTimeout(() => setFeedback(''), 1500);
            return;
        }

        if (ladder.includes(word)) {
            setFeedback('❌ Word already used');
            setTimeout(() => setFeedback(''), 1500);
            return;
        }

        const newLadder = [...ladder, word];
        setLadder(newLadder);
        setCurrentWord('');

        if (word === currentPuzzle.end) {
            setCompleted(true);
            const baseScore = 100;
            const stepPenalty = (newLadder.length - 1) * 5;
            const hintPenalty = showHint ? 20 : 0;
            setScore(Math.max(0, baseScore - stepPenalty - hintPenalty));
            setFeedback('✅ Puzzle Solved!');
        } else {
            setFeedback('✅ Valid word!');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    const loadNewPuzzle = () => {
        const newPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
        setCurrentPuzzle(newPuzzle);
        setLadder([newPuzzle.start]);
        setCurrentWord('');
        setCompleted(false);
        setShowHint(false);
        setFeedback('');
    };

    const undo = () => {
        if (ladder.length > 1) {
            setLadder(ladder.slice(0, -1));
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <GameLayout
            title="Word Ladder"
            onBack={onBack}
            score={score}
            instructions="Change one letter at a time to transform the start word into the end word!"
        >
            <div className="word-ladder-container">
                {completed && (
                    <div className="complete-message glass-card fade-in">
                        <h2>🎉 Puzzle Solved!</h2>
                        <p>Steps: {ladder.length - 1}</p>
                        <p>Optimal: {currentPuzzle.solution.length - 1}</p>
                        <p>Score: {score}</p>
                        <button className="btn btn-primary" onClick={loadNewPuzzle}>
                            Next Puzzle
                        </button>
                    </div>
                )}

                <div className="word-endpoints glass-card">
                    <div className="start-word">{currentPuzzle.start}</div>
                    <div className="arrow">→</div>
                    <div className="end-word">{currentPuzzle.end}</div>
                </div>

                <div className="word-ladder glass-card">
                    {ladder.map((word, index) => (
                        <div key={index} className="ladder-step fade-in">
                            <span className="step-number">{index + 1}</span>
                            <span className="step-word">{word}</span>
                        </div>
                    ))}
                </div>

                {!completed && (
                    <div className="input-section">
                        <input
                            type="text"
                            className="word-input glass-card"
                            value={currentWord}
                            onChange={(e) => setCurrentWord(e.target.value.toUpperCase())}
                            onKeyPress={handleKeyPress}
                            placeholder="Next word..."
                            maxLength={currentPuzzle.start.length}
                            autoFocus
                        />
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Add Word
                        </button>
                    </div>
                )}

                {feedback && (
                    <div className={`feedback ${feedback.includes('✅') ? 'correct' : 'incorrect'}`}>
                        {feedback}
                    </div>
                )}

                <div className="controls">
                    {ladder.length > 1 && !completed && (
                        <button className="btn btn-secondary" onClick={undo}>
                            ↶ Undo
                        </button>
                    )}

                    {!showHint && !completed ? (
                        <button className="btn btn-secondary" onClick={() => setShowHint(true)}>
                            💡 Show Solution (-20 points)
                        </button>
                    ) : showHint && (
                        <div className="hint glass-card fade-in">
                            Solution: {currentPuzzle.solution.join(' → ')}
                        </div>
                    )}
                </div>
            </div>
        </GameLayout>
    );
};

export default WordLadder;
