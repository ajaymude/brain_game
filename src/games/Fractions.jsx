import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './Fractions.css';

const Fractions = ({ onBack }) => {
    const [fraction, setFraction] = useState({ num: 0, den: 0, simplified: '' });
    const [userNum, setUserNum] = useState('');
    const [userDen, setUserDen] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        generateFraction();
    }, []);

    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);

    const generateFraction = () => {
        const numerator = Math.floor(Math.random() * 20) + 2;
        const denominator = Math.floor(Math.random() * 20) + 2;
        const divisor = gcd(numerator, denominator);
        const simpNum = numerator / divisor;
        const simpDen = denominator / divisor;

        setFraction({ num: numerator, den: denominator, simplified: `${simpNum}/${simpDen}` });
        setUserNum('');
        setUserDen('');
        setFeedback('');
    };

    const handleSubmit = () => {
        const divisor = gcd(fraction.num, fraction.den);
        const correctNum = fraction.num / divisor;
        const correctDen = fraction.den / divisor;

        if (parseInt(userNum) === correctNum && parseInt(userDen) === correctDen) {
            setFeedback('✅ Correct!');
            setScore(score + 10);
            setTimeout(generateFraction, 1500);
        } else {
            setFeedback('❌ Wrong!');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout
            title="Simplify Fractions"
            onBack={onBack}
            score={score}
            instructions="Reduce the fraction to its simplest form!"
        >
            <div className="fractions-container">
                <div className="fraction-display glass-card">
                    <div className="fraction">
                        <div className="numerator">{fraction.num}</div>
                        <div className="divider"></div>
                        <div className="denominator">{fraction.den}</div>
                    </div>
                </div>

                <div className="equals">=</div>

                <div className="answer-fraction glass-card">
                    <input
                        type="number"
                        className="fraction-input"
                        value={userNum}
                        onChange={(e) => setUserNum(e.target.value)}
                        placeholder="?"
                    />
                    <div className="divider"></div>
                    <input
                        type="number"
                        className="fraction-input"
                        value={userDen}
                        onChange={(e) => setUserDen(e.target.value)}
                        placeholder="?"
                    />
                </div>

                <button className="btn btn-primary" onClick={handleSubmit}>
                    Check
                </button>

                {feedback && (
                    <div className={`feedback ${feedback.includes('✅') ? 'correct' : 'incorrect'}`}>
                        {feedback}
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default Fractions;
