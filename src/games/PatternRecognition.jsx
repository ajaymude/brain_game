import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './PatternRecognition.css';

const patterns = [
    {
        sequence: ['🔴', '🔵', '🔴', '🔵'],
        options: ['🔴', '🔵', '🟢'],
        answer: '🔴',
        hint: 'Alternating pattern'
    },
    {
        sequence: ['⭐', '⭐', '❤️', '⭐', '⭐', '❤️'],
        options: ['⭐', '❤️', '💎'],
        answer: '⭐',
        hint: 'Two stars, one heart'
    },
    {
        sequence: ['🔺', '🔷', '🔺', '🔷', '🔺'],
        options: ['🔺', '🔷', '🔶'],
        answer: '🔷',
        hint: 'Alternating shapes'
    },
    {
        sequence: ['🟢', '🟢', '🟡', '🟢', '🟢', '🟡'],
        options: ['🟢', '🟡', '🔴'],
        answer: '🟢',
        hint: 'GGY pattern'
    },
    {
        sequence: ['💎', '💎', '💎', '⭐', '💎', '💎', '💎', '⭐'],
        options: ['💎', '⭐', '❤️'],
        answer: '💎',
        hint: 'Three diamonds, one star'
    }
];

const PatternRecognition = ({ onBack }) => {
    const [currentPattern, setCurrentPattern] = useState(null);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [showHint, setShowHint] = useState(false);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        loadNewPattern();
    }, []);

    const loadNewPattern = () => {
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        setCurrentPattern(randomPattern);
        setShowHint(false);
        setFeedback('');
        setRound(round + 1);
    };

    const handleAnswer = (answer) => {
        if (answer === currentPattern.answer) {
            setFeedback('✅ Correct!');
            setScore(score + (showHint ? 5 : 10));
            setStreak(streak + 1);
            setTimeout(loadNewPattern, 1000);
        } else {
            setFeedback('❌ Wrong!');
            setStreak(0);
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout
            title="Pattern Recognition"
            onBack={onBack}
            score={score}
            instructions="Study the pattern and select what comes next!"
        >
            <div className="pattern-container">
                {currentPattern && (
                    <div className="pattern-game">
                        <div className="round-display">Round {round}</div>

                        {streak > 2 && (
                            <div className="streak-badge fade-in">
                                🔥 {streak} Streak!
                            </div>
                        )}

                        <div className="pattern-sequence glass-card">
                            {currentPattern.sequence.map((item, idx) => (
                                <div key={idx} className="pattern-item fade-in">
                                    {item}
                                </div>
                            ))}
                            <div className="pattern-item next-item">
                                ?
                            </div>
                        </div>

                        <div className="pattern-options">
                            {currentPattern.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    className="option-btn glass-card"
                                    onClick={() => handleAnswer(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        {feedback && (
                            <div className={`feedback ${feedback.includes('✅') ? 'correct' : 'incorrect'}`}>
                                {feedback}
                            </div>
                        )}

                        <div className="hint-section">
                            {!showHint ? (
                                <button className="btn btn-secondary" onClick={() => setShowHint(true)}>
                                    💡 Show Hint (-5 points)
                                </button>
                            ) : (
                                <div className="hint-text fade-in">
                                    {currentPattern.hint}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default PatternRecognition;
