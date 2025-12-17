import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './TowerOfHanoi.css';

const TowerOfHanoi = ({ onBack }) => {
    const [disks, setDisks] = useState(3);
    const [towers, setTowers] = useState([[], [], []]);
    const [selectedTower, setSelectedTower] = useState(null);
    const [moves, setMoves] = useState(0);
    const [minMoves, setMinMoves] = useState(7);
    const [gameWon, setGameWon] = useState(false);

    useEffect(() => {
        resetGame();
    }, [disks]);

    const resetGame = () => {
        const initialTower = Array.from({ length: disks }, (_, i) => disks - i);
        setTowers([initialTower, [], []]);
        setSelectedTower(null);
        setMoves(0);
        setMinMoves(Math.pow(2, disks) - 1);
        setGameWon(false);
    };

    const handleTowerClick = (towerIndex) => {
        if (selectedTower === null) {
            if (towers[towerIndex].length > 0) {
                setSelectedTower(towerIndex);
            }
        } else {
            if (selectedTower === towerIndex) {
                setSelectedTower(null);
            } else {
                moveDisk(selectedTower, towerIndex);
            }
        }
    };

    const moveDisk = (from, to) => {
        const newTowers = towers.map(tower => [...tower]);
        const disk = newTowers[from][newTowers[from].length - 1];
        const targetTop = newTowers[to][newTowers[to].length - 1];

        if (targetTop === undefined || disk < targetTop) {
            newTowers[from].pop();
            newTowers[to].push(disk);
            setTowers(newTowers);
            setMoves(moves + 1);
            setSelectedTower(null);

            if (newTowers[2].length === disks) {
                setGameWon(true);
            }
        } else {
            setSelectedTower(null);
        }
    };

    const changeDifficulty = (newDisks) => {
        setDisks(newDisks);
    };

    return (
        <GameLayout
            title="Tower of Hanoi"
            onBack={onBack}
            score={moves}
            instructions="Move all disks to the rightmost tower. Only one disk at a time, and never place a larger disk on a smaller one."
        >
            <div className="hanoi-container">
                {gameWon && (
                    <div className="win-message glass-card fade-in">
                        <h2>🎉 Perfect!</h2>
                        <p>Completed in {moves} moves</p>
                        <p className="min-moves">Minimum possible: {minMoves}</p>
                        <button className="btn btn-primary" onClick={resetGame}>
                            Play Again
                        </button>
                    </div>
                )}

                <div className="difficulty-selector">
                    <label>Difficulty: </label>
                    {[3, 4, 5, 6].map(n => (
                        <button
                            key={n}
                            className={`btn ${disks === n ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => changeDifficulty(n)}
                        >
                            {n} Disks
                        </button>
                    ))}
                </div>

                <div className="hanoi-game">
                    <div className="towers-container">
                        {towers.map((tower, towerIndex) => (
                            <div
                                key={towerIndex}
                                className={`tower ${selectedTower === towerIndex ? 'selected' : ''}`}
                                onClick={() => handleTowerClick(towerIndex)}
                            >
                                <div className="tower-pole"></div>
                                <div className="tower-base"></div>
                                <div className="disks-container">
                                    {tower.map((diskSize, diskIndex) => (
                                        <div
                                            key={diskIndex}
                                            className="disk"
                                            style={{
                                                width: `${diskSize * 30}px`,
                                                backgroundColor: `hsl(${diskSize * 40}, 70%, 60%)`
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </GameLayout>
    );
};

export default TowerOfHanoi;
