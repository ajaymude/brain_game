import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './VisualComparison.css';

const VisualComparison = ({ onBack }) => {
    const [shapes, setShapes] = useState({ left: {}, right: {} });
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);
    const [feedback, setFeedback] = useState('');

    useState(() => {
        generateChallenge();
    }, []);

    const generateChallenge = () => {
        const size1 = Math.random() * 100 + 50;
        const size2 = size1 + (Math.random() - 0.5) * 40;
        const color1 = ['#ef4444', '#3b82f6', '#10b981'][Math.floor(Math.random() * 3)];
        const color2 = ['#ef4444', '#3b82f6', '#10b981'][Math.floor(Math.random() * 3)];

        setShapes({
            left: { size: size1, color: color1 },
            right: { size: size2, color: color2 }
        });
        setRound(round + 1);
        setFeedback('');
    };

    const handleAnswer = (answer) => {
        const correct = answer === 'left' ? shapes.left.size > shapes.right.size : shapes.right.size > shapes.left.size;

        if (correct) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateChallenge, 800);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout
            title="Visual Comparison"
            onBack={onBack}
            score={score}
            instructions="Which circle is BIGGER?"
        >
            <div className="visual-comparison-container">
                <div className="shapes-display">
                    <div className="shape-wrapper">
                        <div
                            className="shape"
                            style={{
                                width: `${shapes.left.size}px`,
                                height: `${shapes.left.size}px`,
                                backgroundColor: shapes.left.color
                            }}
                        ></div>
                        <button className="btn btn-primary choice-btn" onClick={() => handleAnswer('left')}>
                            LEFT
                        </button>
                    </div>

                    <div className="vs-text">VS</div>

                    <div className="shape-wrapper">
                        <div
                            className="shape"
                            style={{
                                width: `${shapes.right.size}px`,
                                height: `${shapes.right.size}px`,
                                backgroundColor: shapes.right.color
                            }}
                        ></div>
                        <button className="btn btn-primary choice-btn" onClick={() => handleAnswer('right')}>
                            RIGHT
                        </button>
                    </div>
                </div>

                {feedback && <div className="feedback-icon">{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default VisualComparison;
