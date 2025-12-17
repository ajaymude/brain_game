import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './ShapeShifter.css';

const shapes = ['⬤', '⬟', '▲', '■', '⬠'];
const colors = ['#ef4444', '#3b82f6', '#10b981', '#eab308', '#a855f7'];

const ShapeShifter = ({ onBack }) => {
    const [shape, setShape] = useState('');
    const [color, setColor] = useState('');
    const [task, setTask] = useState('');
    const [score, setScore] = useState(0);

    useEffect(() => {
        generateChallenge();
    }, []);

    const generateChallenge = () => {
        const s = shapes[Math.floor(Math.random() * shapes.length)];
        const c = colors[Math.floor(Math.random() * colors.length)];
        const t = ['shape', 'color'][Math.floor(Math.random() * 2)];

        setShape(s);
        setColor(c);
        setTask(t);
    };

    const handleAnswer = (answer) => {
        const correct = (task === 'shape' && answer === shape) || (task === 'color' && answer === color);

        if (correct) {
            setScore(score + 10);
            setTimeout(generateChallenge, 500);
        } else {
            setTimeout(() => { }, 500);
        }
    };

    return (
        <GameLayout
            title="Shape Shifter"
            onBack={onBack}
            score={score}
            instructions="Match the SHAPE or COLOR as instructed!"
        >
            <div className="shape-shifter-container">
                <div className="instruction glass-card">
                    Match the <span className="highlight">{task.toUpperCase()}</span>
                </div>

                <div className="current-stimulus glass-card">
                    <div className="stimulus-shape" style={{ color: color }}>
                        {shape}
                    </div>
                </div>

                <div className="options">
                    <div className="options-label">Shapes:</div>
                    <div className="shape-options">
                        {shapes.map(s => (
                            <button key={s} className="option-btn" onClick={() => handleAnswer(s)}>
                                {s}
                            </button>
                        ))}
                    </div>

                    <div className="options-label">Colors:</div>
                    <div className="color-options">
                        {colors.map(c => (
                            <div
                                key={c}
                                className="color-option"
                                style={{ backgroundColor: c }}
                                onClick={() => handleAnswer(c)}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </GameLayout>
    );
};

export default ShapeShifter;
