import React, { useState, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import './GameLayout.css';

const GameLayout = ({ title, children, onBack, score, timer, instructions, benefits }) => {
    const contextGame = useContext(GameContext);
    const activeBenefits = benefits || contextGame?.benefits;
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div className="game-layout">
            <div className="game-header glass-card">
                <button className="back-button btn-secondary" onClick={onBack}>
                    ← Back
                </button>
                <h2 className="game-layout-title">{title}</h2>
                <div className="game-stats">
                    {activeBenefits && (
                        <button
                            className="info-button"
                            onClick={() => setShowInfo(!showInfo)}
                            title="About this game"
                        >
                            {showInfo ? '✖️' : 'ℹ️'}
                        </button>
                    )}
                    {timer !== undefined && (
                        <div className="stat-item">
                            <span className="stat-label">⏱️</span>
                            <span className="stat-value">{timer}s</span>
                        </div>
                    )}
                    {score !== undefined && (
                        <div className="stat-item">
                            <span className="stat-label">🏆</span>
                            <span className="stat-value">{score}</span>
                        </div>
                    )}
                </div>
            </div>

            {showInfo && activeBenefits && (
                <div className="game-benefits glass-card fade-in">
                    <h3>📚 About This Game</h3>
                    <div className="benefit-section">
                        <strong>🧠 Cognitive Skills:</strong>
                        <p>{activeBenefits.skills}</p>
                    </div>
                    <div className="benefit-section">
                        <strong>🎯 Brain Areas:</strong>
                        <p>{activeBenefits.brainAreas}</p>
                    </div>
                    <div className="benefit-section">
                        <strong>🎮 How to Play:</strong>
                        <p>{activeBenefits.howToPlay}</p>
                    </div>
                    <div className="benefit-section">
                        <strong>⭐ Why It Matters:</strong>
                        <p>{activeBenefits.importance}</p>
                    </div>
                </div>
            )}

            {instructions && (
                <div className="game-instructions glass-card fade-in">
                    <p>{instructions}</p>
                </div>
            )}

            <div className="game-content">
                {children}
            </div>
        </div>
    );
};

export default GameLayout;
