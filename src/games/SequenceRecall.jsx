import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './SequenceRecall.css';

const SequenceRecall = ({ onBack }) => {
    const [sequence, setSequence] = useState([]);
    const [userSeq, setUserSeq] = useState([]);
    const [phase, setPhase] = useState('start');
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(4);

    const startGame = () => {
        const seq = Array.from({ length: level }, () => Math.floor(Math.random() * 9) + 1);
        setSequence(seq);
        setUserSeq([]);
        setPhase('showing');
        setTimeout(() => setPhase('input'), 2500);
    };

    const handleSelect = (n) => {
        if (phase !== 'input') return;
        const newSeq = [...userSeq, n];
        setUserSeq(newSeq);

        if (newSeq.length === level) {
            if (newSeq.every((x, i) => x === sequence[i])) {
                setScore(score + level * 5);
                setPhase('correct');
            } else {
                setPhase('failed');
            }
        }
    };

    return (
        <GameLayout
            title="Sequence Recall"
            onBack={onBack}
            score={score}
            instructions="Memorize the number sequence!"
        >
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center', minHeight: '500px', justifyContent: 'center' }}>
                {phase === 'start' && (
                    <button className="btn btn-primary" onClick={startGame}>Start</button>
                )}

                {(phase === 'showing' || phase === 'input') && (
                    <>
                        <div>{phase === 'showing' ? 'Memorize!' : 'Enter the sequence'}</div>
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', minHeight: '80px', fontSize: '2.5rem' }}>
                            {phase === 'showing' && sequence.join(' ')}
                            {phase === 'input' && userSeq.join(' ')}
                        </div>
                        {phase === 'input' && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-sm)' }}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                                    <button key={n} className="btn btn-secondary" style={{ fontSize: '1.5rem' }} onClick={() => handleSelect(n)}>
                                        {n}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {phase === 'correct' && (
                    <div>
                        <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-md)' }}>✅ Correct!</div>
                        <button className="btn btn-primary" onClick={() => { setLevel(level + 1); startGame(); }}>
                            Next Level
                        </button>
                    </div>
                )}

                {phase === 'failed' && (
                    <div className="glass-card" style={{ padding: 'var(--spacing-xl)' }}>
                        <h2>Game Over</h2>
                        <p>Level: {level}</p>
                        <button className="btn btn-primary" onClick={() => { setLevel(4); setScore(0); startGame(); }}>
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default SequenceRecall;
