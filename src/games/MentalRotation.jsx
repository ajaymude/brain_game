import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './MentalRotation.css';

const shapes = ['🔺', '🔷', '🔶', '⬟', '⭐'];

const MentalRotation = ({ onBack }) => {
    const [currentShape, setCurrentShape] = useState('');
    const [targetRotation, setTargetRotation] = useState(0);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        generateChallenge();
    }, []);

    const generateChallenge = () => {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const rotation = [0, 90, 180, 270][Math.floor(Math.random() * 4)];

        const opts = [rotation];
        while (opts.length < 4) {
            const r = [0, 90, 180, 270][Math.floor(Math.random() * 4)];
            if (!opts.includes(r)) opts.push(r);
        }

        setCurrentShape(shape);
        setTargetRotation(rotation);
        setOptions(opts.sort(() => Math.random() - 0.5));
        setRound(round + 1);
        setFeedback('');
    };

    const handleAnswer = (rotation) => {
        if (rotation === targetRotation) {
            setFeedback('✅ Correct!');
            setScore(score + 10);
            setTimeout(generateChallenge, 1000);
        } else {
            setFeedback('❌ Wrong!');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout
            title="Mental Rotation"
            onBack={onBack}
            score={score}
            instructions="Which rotation matches the original shape?"
        >
            <div className="rotation-container">
                <div className="round-info">Round {round}</div>

                <div className="original-shape glass-card">
                    <div className="label">Original</div>
                    <div className="shape">{currentShape}</div>
                </div>

                <div className="options-grid">
                    {options.map((rot, idx) => (
                        <div
                            key={idx}
                            className="option-shape glass-card"
                            onClick={() => handleAnswer(rot)}
                        >
                            <div className="shape" style={{ transform: `rotate(${rot}deg)` }}>
                                {currentShape}
                            </div>
                            <div className="rotation-label">{rot}°</div>
                        </div>
                    ))}
                </div>

                {feedback && (
                    <div className={`feedback ${feedback.includes('✅') ? 'correct' : 'incorrect'}`}>
                        {feedback}
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default MentalRotation;
