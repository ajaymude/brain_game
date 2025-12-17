import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const ColorMixer = ({ onBack }) => {
    const [color1, setColor1] = useState('');
    const [color2, setColor2] = useState('');
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const colors = { RED: 'red', BLUE: 'blue', YELLOW: 'yellow' };
    const mixes = { RED_BLUE: 'purple', RED_YELLOW: 'orange', BLUE_YELLOW: 'green' };

    const generateProblem = () => {
        const cols = Object.keys(colors);
        const c1 = cols[Math.floor(Math.random() * cols.length)];
        let c2 = cols[Math.floor(Math.random() * cols.length)];
        while (c2 === c1) c2 = cols[Math.floor(Math.random() * cols.length)];
        const key = [c1, c2].sort().join('_');
        const correct = mixes[key] || 'unknown';
        const opts = [correct, 'purple', 'orange', 'green'].filter((v, i, a) => a.indexOf(v) === i).slice(0, 3);
        setColor1(c1);
        setColor2(c2);
        setOptions(opts.sort(() => Math.random() - 0.5));
        setFeedback('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleAnswer = (ans) => {
        const key = [color1, color2].sort().join('_');
        const correct = mixes[key];
        if (ans === correct) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateProblem, 1000);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout title="Color Mixer" onBack={onBack} score={score} instructions="What color do you get when mixing these?">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-lg)', display: 'flex', gap: 'var(--spacing-lg)', alignItems: 'center' }}>
                    <div style={{ width: '80px', height: '80px', background: colors[color1], borderRadius: '50%', border: '3px solid white' }}></div>
                    <div style={{ fontSize: '3rem' }}>+</div>
                    <div style={{ width: '80px', height: '80px', background: colors[color2], borderRadius: '50%', border: '3px solid white' }}></div>
                    <div style={{ fontSize: '3rem' }}>=</div>
                    <div style={{ fontSize: '2rem' }}>?</div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {options.map((opt, i) => (
                        <button key={i} className="btn btn-primary" onClick={() => handleAnswer(opt)}>
                            {opt}
                        </button>
                    ))}
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default ColorMixer;
