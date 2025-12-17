import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './MemoryGrid.css';

const MemoryGrid = ({ onBack }) => {
    const [grid, setGrid] = useState(Array(16).fill(false));
    const [targetPositions, setTargetPositions] = useState([]);
    const [userSelections, setUserSelections] = useState([]);
    const [phase, setPhase] = useState('start');
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(3);

    const startGame = () => {
        const positions = [];
        while (positions.length < level) {
            const pos = Math.floor(Math.random() * 16);
            if (!positions.includes(pos)) positions.push(pos);
        }

        setTargetPositions(positions);
        setUserSelections([]);
        setPhase('showing');

        setTimeout(() => {
            setPhase('guessing');
        }, 2000);
    };

    const handleCellClick = (idx) => {
        if (phase !== 'guessing') return;
        if (userSelections.includes(idx)) return;

        const newSelections = [...userSelections, idx];
        setUserSelections(newSelections);

        if (newSelections.length === level) {
            checkAnswer(newSelections);
        }
    };

    const checkAnswer = (selections) => {
        const correct = selections.every(s => targetPositions.includes(s));
        if (correct) {
            setScore(score + level * 10);
            setLevel(Math.min(level + 1, 12));
            setTimeout(startGame, 1500);
        } else {
            setPhase('result');
        }
    };

    return (
        <GameLayout
            title="Memory Grid"
            onBack={onBack}
            score={score}
            instructions="Remember which cells light up, then click them!"
        >
            <div className="memory-grid-container">
                {phase === 'start' && (
                    <div className="start-screen">
                        <div className="level-info">Level {level} - Remember {level} cells</div>
                        <button className="btn btn-primary" onClick={startGame}>Start</button>
                    </div>
                )}

                {(phase === 'showing' || phase === 'guessing') && (
                    <>
                        <div className="instruction">
                            {phase === 'showing' ? 'Memorize!' : `Select ${level} cells`}
                        </div>
                        <div className="grid">
                            {Array.from({ length: 16 }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`grid-cell ${phase === 'showing' && targetPositions.includes(idx) ? 'active' : ''
                                        } ${userSelections.includes(idx) ? 'selected' : ''}`}
                                    onClick={() => handleCellClick(idx)}
                                ></div>
                            ))}
                        </div>
                    </>
                )}

                {phase === 'result' && (
                    <div className="result glass-card">
                        <h2>Game Over</h2>
                        <p>Reached Level {level}</p>
                        <p>Final Score: {score}</p>
                        <button className="btn btn-primary" onClick={() => { setLevel(3); setScore(0); startGame(); }}>
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default MemoryGrid;
