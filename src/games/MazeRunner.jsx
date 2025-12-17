import React, { useState, useEffect, useRef } from 'react';
import GameLayout from '../components/GameLayout';
import './MazeRunner.css';

const MazeRunner = ({ onBack }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [goal, setGoal] = useState({ x: 4, y: 4 });
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);

    const gridSize = 5;

    useEffect(() => {
        const handleKeyPress = (e) => {
            let newPos = { ...position };

            if (e.key === 'ArrowUp' && position.y > 0) newPos.y--;
            else if (e.key === 'ArrowDown' && position.y < gridSize - 1) newPos.y++;
            else if (e.key === 'ArrowLeft' && position.x > 0) newPos.x--;
            else if (e.key === 'ArrowRight' && position.x < gridSize - 1) newPos.x++;

            if (newPos.x !== position.x || newPos.y !== position.y) {
                setPosition(newPos);
                setMoves(moves + 1);

                if (newPos.x === goal.x && newPos.y === goal.y) {
                    setScore(score + Math.max(10, 30 - moves));
                    resetGame();
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [position, moves, goal]);

    const resetGame = () => {
        setPosition({ x: 0, y: 0 });
        const newGoal = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
        };
        setGoal(newGoal);
        setMoves(0);
    };

    return (
        <GameLayout
            title="Maze Runner"
            onBack={onBack}
            score={score}
            instructions="Use arrow keys to reach the goal! Fewer moves = more points"
        >
            <div className="maze-runner-container">
                <div className="maze-grid">
                    {Array.from({ length: gridSize }).map((_, y) => (
                        <div key={y} className="maze-row">
                            {Array.from({ length: gridSize }).map((_, x) => (
                                <div
                                    key={`${x}-${y}`}
                                    className={`maze-cell ${position.x === x && position.y === y ? 'player' : ''
                                        } ${goal.x === x && goal.y === y ? 'goal' : ''}`}
                                >
                                    {position.x === x && position.y === y && '🧑'}
                                    {goal.x === x && goal.y === y && '🎯'}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="stats-panel glass-card">
                    <div>Moves: {moves}</div>
                </div>
            </div>
        </GameLayout>
    );
};

export default MazeRunner;
