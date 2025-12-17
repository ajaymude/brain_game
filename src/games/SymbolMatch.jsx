import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './SymbolMatch.css';

const symbols = ['★', '●', '■', '▲', '♦', '♠', '♥', '♣'];

const SymbolMatch = ({ onBack }) => {
    const [target, setTarget] = useState('');
    const [grid, setGrid] = useState([]);
    const [score, setScore] = useState(0);
    const [found, setFound] = useState(0);
    const [round, setRound] = useState(0);

    useState(() => {
        generateChallenge();
    }, []);

    const generateChallenge = () => {
        const targetSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        const newGrid = Array(25).fill(null).map(() =>
            symbols[Math.floor(Math.random() * symbols.length)]
        );
        // Ensure at least 3 targets
        for (let i = 0; i < 3; i++) {
            newGrid[Math.floor(Math.random() * 25)] = targetSymbol;
        }

        setTarget(targetSymbol);
        setGrid(newGrid);
        setFound(0);
        setRound(round + 1);
    };

    const handleClick = (idx) => {
        if (grid[idx] === target) {
            setScore(score + 2);
            setFound(found + 1);
            const newGrid = [...grid];
            newGrid[idx] = '✓';
            setGrid(newGrid);
        }
    };

    const handleNext = () => {
        generateChallenge();
    };

    return (
        <GameLayout
            title="Symbol Match"
            onBack={onBack}
            score={score}
            instructions="Click all instances of the target symbol!"
        >
            <div className="symbol-match-container">
                <div className="target-display glass-card">
                    <span>Find all:</span>
                    <div className="target-symbol">{target}</div>
                </div>

                <div className="symbol-grid">
                    {grid.map((symbol, idx) => (
                        <div
                            key={idx}
                            className={`symbol-cell ${symbol === '✓' ? 'found' : ''}`}
                            onClick={() => handleClick(idx)}
                        >
                            {symbol}
                        </div>
                    ))}
                </div>

                <button className="btn btn-secondary" onClick={handleNext}>
                    Next Pattern
                </button>
            </div>
        </GameLayout>
    );
};

export default SymbolMatch;
