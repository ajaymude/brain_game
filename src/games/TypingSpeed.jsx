import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './TypingSpeed.css';

const sentences = [
    "The quick brown fox jumps over the lazy dog",
    "Pack my box with five dozen liquor jugs",
    "How vexingly quick daft zebras jump",
    "The five boxing wizards jump quickly",
    "Bright vixens jump; dozy fowl quack"
];

const TypingSpeed = ({ onBack }) => {
    const [targetText, setTargetText] = useState('');
    const [userText, setUserText] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        startTest();
    }, []);

    const startTest = () => {
        const text = sentences[Math.floor(Math.random() * sentences.length)];
        setTargetText(text);
        setUserText('');
        setStartTime(Date.now());
        setCompleted(false);
        setWpm(0);
    };

    const handleChange = (e) => {
        const text = e.target.value;
        setUserText(text);

        if (!startTime) setStartTime(Date.now());

        // Calculate accuracy
        let correct = 0;
        for (let i = 0; i < text.length; i++) {
            if (text[i] === targetText[i]) correct++;
        }
        const acc = text.length > 0 ? (correct / text.length) * 100 : 100;
        setAccuracy(Math.round(acc));

        // Check if completed
        if (text === targetText) {
            const timeElapsed = (Date.now() - startTime) / 1000 / 60;
            const words = targetText.split(' ').length;
            const calculatedWpm = Math.round(words / timeElapsed);
            setWpm(calculatedWpm);
            setCompleted(true);
        }
    };

    return (
        <GameLayout
            title="Typing Speed Test"
            onBack={onBack}
            score={wpm}
            instructions="Type the sentence as fast and accurately as you can!"
        >
            <div className="typing-container">
                {!completed ? (
                    <>
                        <div className="target-text glass-card">
                            {targetText.split('').map((char, idx) => (
                                <span
                                    key={idx}
                                    className={
                                        idx < userText.length
                                            ? userText[idx] === char
                                                ? 'correct'
                                                : 'incorrect'
                                            : ''
                                    }
                                >
                                    {char}
                                </span>
                            ))}
                        </div>

                        <textarea
                            className="typing-input glass-card"
                            value={userText}
                            onChange={handleChange}
                            placeholder="Start typing..."
                            autoFocus
                        />

                        <div className="live-stats">
                            <div className="stat">Accuracy: {accuracy}%</div>
                        </div>
                    </>
                ) : (
                    <div className="results glass-card">
                        <h2>🎉 Completed!</h2>
                        <div className="result-stat">
                            <span>Speed:</span>
                            <span className="value">{wpm} WPM</span>
                        </div>
                        <div className="result-stat">
                            <span>Accuracy:</span>
                            <span className="value">{accuracy}%</span>
                        </div>
                        <button className="btn btn-primary" onClick={startTest}>
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default TypingSpeed;
