import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './ClockReading.css';

const ClockReading = ({ onBack }) => {
    const [time, setTime] = useState({ h: 0, m: 0 });
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        generateClock();
    }, []);

    const generateClock = () => {
        const h = Math.floor(Math.random() * 12) + 1;
        const m = Math.floor(Math.random() * 12) * 5;
        const correct = `${h}:${m.toString().padStart(2, '0')}`;
        const opts = [correct];

        while (opts.length < 4) {
            const wrongH = Math.floor(Math.random() * 12) + 1;
            const wrongM = Math.floor(Math.random() * 12) * 5;
            const wrong = `${wrongH}:${wrongM.toString().padStart(2, '0')}`;
            if (!opts.includes(wrong)) opts.push(wrong);
        }

        setTime({ h, m });
        setOptions(opts.sort(() => Math.random() - 0.5));
        setFeedback('');
    };

    const handleAnswer = (ans) => {
        const correct = `${time.h}:${time.m.toString().padStart(2, '0')}`;
        if (ans === correct) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateClock, 1000);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    const hourAngle = ((time.h % 12) * 30) + (time.m * 0.5);
    const minuteAngle = time.m * 6;

    return (
        <GameLayout
            title="Clock Reading"
            onBack={onBack}
            score={score}
            instructions="What time is shown on the clock?"
        >
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ width: '250px', height: '250px', borderRadius: '50%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{
                        position: 'absolute',
                        width: '4px',
                        height: '60px',
                        background: 'var(--accent-cyan)',
                        transformOrigin: 'bottom center',
                        bottom: '50%',
                        left: '50%',
                        marginLeft: '-2px',
                        transform: `rotate(${hourAngle}deg)`
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        width: '3px',
                        height: '80px',
                        background: 'var(--accent-purple)',
                        transformOrigin: 'bottom center',
                        bottom: '50%',
                        left: '50%',
                        marginLeft: '-1.5px',
                        transform: `rotate(${minuteAngle}deg)`
                    }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--text-primary)', zIndex: 10 }}></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-md)' }}>
                    {options.map((opt, i) => (
                        <button key={i} className="btn btn-primary" style={{ fontSize: '1.3rem' }} onClick={() => handleAnswer(opt)}>
                            {opt}
                        </button>
                    ))}
                </div>

                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default ClockReading;
