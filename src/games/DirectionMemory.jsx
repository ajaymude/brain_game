import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';

const DirectionMemory = ({ onBack }) => {
    const [sequence, setSequence] = useState([]);
    const [userSeq, setUserSeq] = useState([]);
    const [phase, setPhase] = useState('start');
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(3);

    const arrows = ['⬆️', '⬇️', '⬅️', '➡️'];

    const startGame = () => {
        const seq = Array.from({ length: level }, () => arrows[Math.floor(Math.random() * arrows.length)]);
        setSequence(seq);
        setUserSeq([]);
        setPhase('show');
        setTimeout(() => setPhase('input'), 2000);
    };

    const handleSelect = (arrow) => {
        if (phase !== 'input') return;
        const newSeq = [...userSeq, arrow];
        setUserSeq(newSeq);

        if (newSeq.length === level) {
            if (newSeq.every((a, i) => a === sequence[i])) {
                setScore(score + level * 5);
                setLevel(level + 1);
                setTimeout(startGame, 1000);
            } else {
                setPhase('failed');
            }
        }
    };

    return (
        <GameLayout title="Direction Memory" onBack={onBack} score={score} instructions="Remember the arrow sequence!">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center', minHeight: '500px', justifyContent: 'center' }}>
                {phase === 'start' && (
                    <button className="btn btn-primary" onClick={startGame}>Start Level {level}</button>
                )}
                {phase === 'show' && (
                    <>
                        <div>Watch the sequence!</div>
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', minHeight: '80px' }}>
                            {sequence.map((a, i) => <div key={i} style={{ fontSize: '4rem' }}>{a}</div>)}
                        </div>
                    </>
                )}
                {phase === 'input' && (
                    <>
                        <div>Repeat the sequence!</div>
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', minHeight: '80px' }}>
                            {userSeq.map((a, i) => <div key={i} style={{ fontSize: '3rem' }}>{a}</div>)}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
                            {arrows.map(a => (
                                <button key={a} className="btn btn-secondary" style={{ fontSize: '3rem', padding: 'var(--spacing-lg)' }} onClick={() => handleSelect(a)}>
                                    {a}
                                </button>
                            ))}
                        </div>
                    </>
                )}
                {phase === 'failed' && (
                    <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                        <h2>Game Over</h2>
                        <p>Level: {level}</p>
                        <button className="btn btn-primary" onClick={() => { setLevel(3); setScore(0); startGame(); }}>Try Again</button>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default DirectionMemory;
