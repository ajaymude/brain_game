import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';

const RomanNumerals = ({ onBack }) => {
    const [roman, setRoman] = useState('');
    const [arabic, setArabic] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const romanMap = { 1: 'I', 4: 'IV', 5: 'V', 9: 'IX', 10: 'X', 40: 'XL', 50: 'L', 90: 'XC', 100: 'C' };

    useState(() => {
        generateProblem();
    }, []);

    const toRoman = (num) => {
        let result = '';
        const values = [100, 90, 50, 40, 10, 9, 5, 4, 1];
        for (const val of values) {
            while (num >= val) {
                result += romanMap[val];
                num -= val;
            }
        }
        return result;
    };

    const generateProblem = () => {
        const num = Math.floor(Math.random() * 100) + 1;
        setArabic(num);
        setRoman(toRoman(num));
        setUserAnswer('');
        setFeedback('');
    };

    const handleSubmit = () => {
        if (parseInt(userAnswer) === arabic) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateProblem, 1000);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout title="Roman Numerals" onBack={onBack} score={score} instructions="Convert Roman numerals to numbers!">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', fontWeight: '900', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {roman}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <input
                        type="number"
                        className="glass-card"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                        style={{ width: '150px', padding: '14px', fontSize: '1.5rem', textAlign: 'center' }}
                        placeholder="Number"
                        autoFocus
                    />
                    <button className="btn btn-primary" onClick={handleSubmit}>Check</button>
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default RomanNumerals;
