import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './SameOrDifferent.css';

const SameOrDifferent = ({ onBack }) => {
    const [items, setItems] = useState({ left: '', right: '', same: false });
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const shapes = ['⬤', '■', '▲', '⬟', '⬠'];
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#eab308'];

    useState(() => {
        generateChallenge();
    }, []);

    const generateChallenge = () => {
        const same = Math.random() < 0.5;
        const shape1 = shapes[Math.floor(Math.random() * shapes.length)];
        const shape2 = same ? shape1 : shapes[Math.floor(Math.random() * shapes.length)];
        const color1 = colors[Math.floor(Math.random() * colors.length)];
        const color2 = same ? color1 : colors[Math.floor(Math.random() * colors.length)];

        setItems({ left: { shape: shape1, color: color1 }, right: { shape: shape2, color: color2 }, same });
        setFeedback('');
    };

    const handleAnswer = (answer) => {
        const correct = (answer === 'same' && items.same) || (answer === 'different' && !items.same);

        if (correct) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateChallenge, 700);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout
            title="Same or Different"
            onBack={onBack}
            score={score}
            instructions="Are the shapes and colors the same or different?"
        >
            <div className="same-diff-container">
                <div className="items-display">
                    <div className="item" style={{ color: items.left?.color }}>
                        {items.left?.shape}
                    </div>
                    <div className="vs">VS</div>
                    <div className="item" style={{ color: items.right?.color }}>
                        {items.right?.shape}
                    </div>
                </div>

                <div className="answer-buttons">
                    <button className="btn btn-primary" onClick={() => handleAnswer('same')}>
                        SAME
                    </button>
                    <button className="btn btn-primary" onClick={() => handleAnswer('different')}>
                        DIFFERENT
                    </button>
                </div>

                {feedback && <div className="feedback-icon">{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default SameOrDifferent;
