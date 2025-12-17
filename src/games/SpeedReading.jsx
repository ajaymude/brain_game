import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const SpeedReading = ({ onBack }) => {
    const [word, setWord] = useState('');
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const words = ['QUICK', 'BROWN', 'FOX', 'JUMPS', 'LAZY', 'DOG', 'BRIGHT', 'SUN', 'HAPPY', 'SMILE'];

    const generateProblem = () => {
        const w = words[Math.floor(Math.random() * words.length)];
        const opts = [w];
        while (opts.length < 4) {
            const wrong = words[Math.floor(Math.random() * words.length)];
            if (!opts.includes(wrong)) opts.push(wrong);
        }
        setWord(w);
        setOptions(opts.sort(() => Math.random() - 0.5));
        setFeedback('');
        setTimeout(() => setWord(''), 800);
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleAnswer = (ans) => {
        if (ans === word) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateProblem, 1000);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout title="Speed Reading" onBack={onBack} score={score} instructions="Remember the word shown briefly!">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ fontSize: '4rem', fontWeight: '900', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {word || '...'}
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-md)' }}>
                    {options.map((opt, i) => (
                        <button key={i} className="btn btn-secondary" onClick={() => handleAnswer(opt)}>
                            {opt}
                        </button>
                    ))}
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default SpeedReading;
