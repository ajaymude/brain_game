import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './FlashMemory.css';

const FlashMemory = ({ onBack }) => {
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [phase, setPhase] = useState('start');
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(4);

    const symbols = ['🔴', '🔵', '🟢', '🟡', '🟣', '🟠'];

    const startGame = () => {
        const seq = Array.from({ length: level }, () =>
            symbols[Math.floor(Math.random() * symbols.length)]
        );
        setSequence(seq);
        setUserSequence([]);
        setPhase('showing');

        setTimeout(() => setPhase('input'), 1500);
    };

    const handleSelect = (symbol) => {
        if (phase !== 'input') return;

        const newSeq = [...userSequence, symbol];
        setUserSequence(newSeq);

        if (newSeq.length === level) {
            checkAnswer(newSeq);
        }
    };

    const checkAnswer = (seq) => {
        const correct = seq.every((s, i) => s === sequence[i]);

        if (correct) {
            setScore(score + level * 5);
            setLevel(level + 1);
            setTimeout(startGame, 1000);
        } else {
            setPhase('failed');
        }
    };

    return (
        <GameLayout
            title="Flash Memory"
            onBack={onBack}
            score={score}
            instructions="Memorize the sequence then recreate it!"
        >
            <div className="flash-memory-container">
                {phase === 'start' && (
                    <div className="start-screen">
                        <div>Level {level}</div>
                        <button className="btn btn-primary" onClick={startGame}>Start</button>
                    </div>
                )}

                {(phase === 'showing' || phase === 'input') && (
                    <>
                        <div className="instruction">
                            {phase === 'showing' ? 'Memorize!' : 'Select the sequence'}
                        </div>
                        <div className="flash-sequence">
                            {phase === 'showing' && sequence.map((symbol, idx) => (
                                <div key={idx} className="flash-symbol">{symbol}</div>
                            ))}
                        </div>
                        {phase === 'input' && (
                            <>
                                <div className="user-sequence">
                                    {userSequence.map((s, i) => <span key={i}>{s}</span>)}
                                </div>
                                <div className="symbol-options">
                                    {symbols.map(s => (
                                        <button key={s} className="symbol-btn" onClick={() => handleSelect(s)}>
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                )}

                {phase === 'failed' && (
                    <div className="result glass-card">
                        <h2>Game Over</h2>
                        <p>Level: {level}</p>
                        <p>Score: {score}</p>
                        <button className="btn btn-primary" onClick={() => { setLevel(4); setScore(0); startGame(); }}>
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default FlashMemory;
