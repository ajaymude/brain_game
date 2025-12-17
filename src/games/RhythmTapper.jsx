import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './RhythmTapper.css';

const RhythmTapper = ({ onBack }) => {
    const [sequence, setSequence] = useState([]);
    const [userTaps, setUserTaps] = useState([]);
    const [phase, setPhase] = useState('start');
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(3);

    const startGame = () => {
        const seq = Array.from({ length: level }, () => Math.random() < 0.5 ? 'L' : 'R');
        setSequence(seq);
        setUserTaps([]);
        setPhase('show');

        setTimeout(() => setPhase('tap'), 2000);
    };

    const handleTap = (side) => {
        if (phase !== 'tap') return;

        const newTaps = [...userTaps, side];
        setUserTaps(newTaps);

        if (newTaps.length === level) {
            if (newTaps.every((t, i) => t === sequence[i])) {
                setScore(score + level * 5);
                setLevel(level + 1);
                setTimeout(startGame, 1000);
            } else {
                setPhase('failed');
            }
        }
    };

    return (
        <GameLayout title="Rhythm Tapper" onBack={onBack} score={score} instructions="Remember and tap the rhythm pattern!">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center', minHeight: '500px', justifyContent: 'center' }}>
                {phase === 'start' && (
                    <button className="btn btn-primary" onClick={startGame}>Start Level {level}</button>
                )}
                {phase === 'show' && (
                    <div><div style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-md)' }}>Watch the pattern!</div><div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>{sequence.map((s, i) => <div key={i} style={{ fontSize: '4rem', animation: `pulse 0.5s ${i * 0.5}s` }}>{s === 'L' ? '👈' : '👉'}</div>)}</div></div>
                )}
                {phase === 'tap' && (
                    <div><div style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-md)' }}>Tap the pattern!</div><div style={{ display: 'flex', gap: 'var(--spacing-md)', minHeight: '80px' }}>{userTaps.map((t, i) => <span key={i} style={{ fontSize: '3rem' }}>{t === 'L' ? '👈' : '👉'}</span>)}</div><div style={{ display: 'flex', gap: 'var(--spacing-xl)', marginTop: 'var(--spacing-lg)' }}><button className="btn btn-primary" style={{ fontSize: '2rem', padding: 'var(--spacing-lg)' }} onClick={() => handleTap('L')}>👈 Left</button><button className="btn btn-primary" style={{ fontSize: '2rem', padding: 'var(--spacing-lg)' }} onClick={() => handleTap('R')}>👉 Right</button></div></div>
                )}
                {phase === 'failed' && (
                    <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}><h2>Game Over</h2><p>Level: {level}</p><button className="btn btn-primary" onClick={() => { setLevel(3); setScore(0); startGame(); }}>Try Again</button></div>
                )}
            </div>
        </GameLayout>
    );
};

export default RhythmTapper;
