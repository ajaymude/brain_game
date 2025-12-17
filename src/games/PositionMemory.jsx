import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';

const PositionMemory = ({ onBack }) => {
    const [items, setItems] = useState([]);
    const [phase, setPhase] = useState('start');
    const [targetPos, setTargetPos] = useState(0);
    const [score, setScore] = useState(0);

    const symbols = ['🎯', '⚽', '🎨', '🎭', '🎪', '🎬', '🎮', '🎲'];

    const startGame = () => {
        const shuffled = [...symbols].sort(() => Math.random() - 0.5);
        const target = Math.floor(Math.random() * 8);
        setItems(shuffled);
        setTargetPos(target);
        setPhase('show');
        setTimeout(() => setPhase('hidden'), 2000);
    };

    const handleClick = (idx) => {
        if (phase !== 'hidden') return;
        if (idx === targetPos) {
            setScore(score + 10);
            startGame();
        } else {
            setPhase('failed');
        }
    };

    return (
        <GameLayout title="Position Memory" onBack={onBack} score={score} instructions="Remember where the highlighted item is!">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center', minHeight: '500px', justifyContent: 'center' }}>
                {phase === 'start' && (
                    <button className="btn btn-primary" onClick={startGame}>Start</button>
                )}
                {(phase === 'show' || phase === 'hidden') && (
                    <>
                        <div style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-md)' }}>
                            {phase === 'show' ? 'Remember this position!' : 'Click where it was!'}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-md)' }}>
                            {items.map((item, i) => (
                                <div
                                    key={i}
                                    onClick={() => handleClick(i)}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '2.5rem',
                                        background: phase === 'show' && i === targetPos ? 'rgba(16,185,129,0.3)' : 'var(--glass-bg)',
                                        border: '2px solid var(--glass-border)',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: phase === 'hidden' ? 'pointer' : 'default'
                                    }}
                                >
                                    {phase === 'show' ? item : '?'}
                                </div>
                            ))}
                        </div>
                    </>
                )}
                {phase === 'failed' && (
                    <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                        <h2>Wrong!</h2>
                        <button className="btn btn-primary" onClick={startGame}>Try Again</button>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default PositionMemory;
