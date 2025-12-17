import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './FractionCompare.css';

const FractionCompare = ({ onBack }) => {
    const [fractions, setFractions] = useState({ left: {}, right: {} });
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useState(() => {
        generateFractions();
    }, []);

    const generateFractions = () => {
        const num1 = Math.floor(Math.random() * 9) + 1;
        const den1 = Math.floor(Math.random() * 9) + 1;
        const num2 = Math.floor(Math.random() * 9) + 1;
        const den2 = Math.floor(Math.random() * 9) + 1;

        setFractions({ left: { num: num1, den: den1 }, right: { num: num2, den: den2 } });
        setFeedback('');
    };

    const handleAnswer = (answer) => {
        const val1 = fractions.left.num / fractions.left.den;
        const val2 = fractions.right.num / fractions.right.den;
        let correct = false;

        if (answer === '>' && val1 > val2) correct = true;
        if (answer === '<' && val1 < val2) correct = true;
        if (answer === '=' && Math.abs(val1 - val2) < 0.001) correct = true;

        if (correct) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateFractions, 700);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout
            title="Fraction Compare"
            onBack={onBack}
            score={score}
            instructions="Compare the fractions using >, <, or ="
        >
            <div className="fraction-compare-container">
                <div className="fractions-display">
                    <div className="fraction glass-card">
                        <div className="numerator">{fractions.left.num}</div>
                        <div className="divider"></div>
                        <div className="denominator">{fractions.left.den}</div>
                    </div>
                    <div className="vs-symbol">?</div>
                    <div className="fraction glass-card">
                        <div className="numerator">{fractions.right.num}</div>
                        <div className="divider"></div>
                        <div className="denominator">{fractions.right.den}</div>
                    </div>
                </div>

                <div className="symbol-buttons">
                    <button className="btn btn-primary" onClick={() => handleAnswer('>')}>
                        &gt;
                    </button>
                    <button className="btn btn-primary" onClick={() => handleAnswer('<')}>
                        &lt;
                    </button>
                    <button className="btn btn-primary" onClick={() => handleAnswer('=')}>
                        =
                    </button>
                </div>

                {feedback && <div className="feedback-icon">{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default FractionCompare;
