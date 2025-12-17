import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './AnagramSolver.css';

const words = [
    { word: 'LISTEN', scrambled: 'SILENT' },
    { word: 'TRIANGLE', scrambled: 'INTEGRAL' },
    { word: 'ASTRONOMER', scrambled: 'MOON STARER' },
    { word: 'ELEVEN PLUS TWO', scrambled: 'TWELVE PLUS ONE' },
    { word: 'CONVERSATION', scrambled: 'VOICES RANT ON' },
    { word: 'DORMITORY', scrambled: 'DIRTY ROOM' },
    { word: 'THE EYES', scrambled: 'THEY SEE' },
    { word: 'SLOT MACHINES', scrambled: 'CASH LOST IN ME' },
    { word: 'DEBIT CARD', scrambled: 'BAD CREDIT' },
    { word: 'SCHOOLMASTER', scrambled: 'THE CLASSROOM' },
    { word: 'ELVIS', scrambled: 'LIVES' },
    { word: 'BRUSH', scrambled: 'SHRUB' },
    { word: 'NUCLEAR', scrambled: 'UNCLEAR' },
    { word: 'RESTFUL', scrambled: 'FLUSTER' },
    { word: 'PLAYERS', scrambled: 'PARSLEY' }
];

const AnagramSolver = ({ onBack }) => {
    const [currentWord, setCurrentWord] = useState(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [skipped, setSkipped] = useState(0);

    const loadNewWord = () => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setCurrentWord(randomWord);
        setUserAnswer('');
        setShowHint(false);
        setFeedback('');
    };

    useEffect(() => {
        loadNewWord();
    }, []);

    const checkAnswer = () => {
        if (!userAnswer.trim()) return;

        const normalizedAnswer = userAnswer.toUpperCase().replace(/\s+/g, '');
        const normalizedWord = currentWord.word.toUpperCase().replace(/\s+/g, '');

        if (normalizedAnswer === normalizedWord) {
            setFeedback('✅ Correct!');
            setScore(score + (showHint ? 5 : 10));
            setQuestionsAnswered(questionsAnswered + 1);
            setTimeout(loadNewWord, 1500);
        } else {
            setFeedback('❌ Try again!');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    const skipWord = () => {
        setSkipped(skipped + 1);
        loadNewWord();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    };

    if (!currentWord) {
        loadNewWord();
        return null;
    }

    return (
        <GameLayout
            title="Anagram Solver"
            onBack={onBack}
            score={score}
            instructions="Unscramble the letters to find the word!"
        >
            <div className="anagram-container">
                <div className="anagram-game">
                    <div className="scrambled-word glass-card">
                        <div className="scrambled-label">Scrambled:</div>
                        <div className="scrambled-text">{currentWord.scrambled}</div>
                    </div>

                    <div className="answer-section">
                        <input
                            type="text"
                            className="answer-input glass-card"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Your answer..."
                            autoFocus
                        />
                        <button className="btn btn-primary" onClick={checkAnswer}>
                            Check
                        </button>
                    </div>

                    {feedback && (
                        <div className={`feedback ${feedback.includes('✅') ? 'correct' : 'incorrect'}`}>
                            {feedback}
                        </div>
                    )}

                    <div className="hint-section">
                        {!showHint ? (
                            <button className="btn btn-secondary" onClick={() => setShowHint(true)}>
                                💡 Show First Letter (-5 points)
                            </button>
                        ) : (
                            <div className="hint-text fade-in">
                                Hint: Starts with "{currentWord.word.charAt(0)}"
                            </div>
                        )}
                    </div>

                    <button className="btn btn-secondary skip-btn" onClick={skipWord}>
                        Skip Word
                    </button>

                    <div className="stats-display">
                        <div className="stat-box">
                            <div className="stat-label">Solved</div>
                            <div className="stat-value">{questionsAnswered}</div>
                        </div>
                        <div className="stat-box">
                            <div className="stat-label">Skipped</div>
                            <div className="stat-value">{skipped}</div>
                        </div>
                    </div>
                </div>
            </div>
        </GameLayout>
    );
};

export default AnagramSolver;
