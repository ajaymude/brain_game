import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './OddEvenSort.css';

const OddEvenSort = ({ onBack }) => {
    const [numbers, setNumbers] = useState([]);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);

    useEffect(() => {
        generateNumbers();
    }, []);

    const generateNumbers = () => {
        const nums = Array.from({ length: 10 }, () => Math.floor(Math.random() * 50) + 1);
        setNumbers(nums);
        setRound(round + 1);
    };

    const handleSort = (type) => {
        const sorted = type === 'odd'
            ? numbers.filter(n => n % 2 !== 0).sort((a, b) => a - b)
            : numbers.filter(n => n % 2 === 0).sort((a, b) => a - b);

        setNumbers(sorted);
        setScore(score + 5);
    };

    return (
        <GameLayout
            title="Odd/Even Sort"
            onBack={onBack}
            score={score}
            instructions="Sort numbers by odd or even, then by value!"
        >
            <div className="odd-even-container">
                <div className="numbers-display glass-card">
                    {numbers.map((num, idx) => (
                        <div key={idx} className={`number-box ${num % 2 === 0 ? 'even' : 'odd'}`}>
                            {num}
                        </div>
                    ))}
                </div>

                <div className="controls">
                    <button className="btn btn-primary" onClick={() => handleSort('odd')}>
                        Sort Odd
                    </button>
                    <button className="btn btn-primary" onClick={() => handleSort('even')}>
                        Sort Even
                    </button>
                    <button className="btn btn-secondary" onClick={generateNumbers}>
                        New Numbers
                    </button>
                </div>
            </div>
        </GameLayout>
    );
};

export default OddEvenSort;
