import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './ColorSequence.css';

const ColorSequence = ({ onBack }) => {
    const [sequence, setSequence] = useState([]);
    const [userSeq, setUserSeq] = useState([]);
    const [phase, setPhase] = useState('start');
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(3);

    const colors = ['🔴', '🔵', '🟢', '🟡'];

    const startGame = () => {
        const seq = Array.from({ length: level }, () => colors[Math.floor(Math.random() * colors.length)]);
        setSequence(seq);
        setUserSeq([]);
        setPhase('showing');
        setTimeout(() => setPhase('input'), 2000);
    };

    const handleSelect = (c) => {
        if (phase !== 'input') return;
        const newSeq = [...userSeq, c];
        setUserSeq(newSeq);

        if (newSeq.length === level) {
            if (newSeq.every((x, i) => x === sequence[i])) {
                setScore(score + level * 5);
                setLevel(level + 1);
                setTimeout(startGame, 1000);
            } else {
                setPhase('failed');
            }
        }
    };

    return (
        <GameLayout
            title="Color Sequence"
            onBack={onBack}
            score={score}
            instructions="Memorize the color sequence!"
        >
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center', minHeight: '500px', justifyContent: 'center' }}>
                {phase === 'start' && (
                    <div>
                        <button className="btn btn-primary" onClick={startGame}>
                            Start Level {level}
                        </button>
                    </div>
                )}

                {(phase === 'showing' || phase === 'input') && (
                    <>
                        <div>{phase === 'showing' ? 'Memorize!' : 'Recreate the sequence'}</div>
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', minHeight: '80px' }}>
                            {phase === 'showing' && sequence.map((c, i) => (
                                <div key={i} style={{ fontSize: '3rem' }}>{c}</div>
                            ))}
                        </div>
                        {phase === 'input' && (
                            <>
                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', fontSize: '2.5rem', minHeight: '70px' }}>
                                    {userSeq.map((c, i) => <span key={i}>{c}</span>)}
                                </div>
                                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                                    {colors.map(c => (
                                        <button
                                            key={c}
                                            style={{ fontSize: '3rem', padding: 'var(--spacing-md)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                                            onClick={() => handleSelect(c)}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}

                {phase === 'failed' && (
                    <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                        <h2>Game Over</h2>
                        <p>Level: {level}</p>
                        <p>Score: {score}</p>
                        <button className="btn btn-primary" onClick={() => { setLevel(3); setScore(0); startGame(); }}>
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default ColorSequence;
