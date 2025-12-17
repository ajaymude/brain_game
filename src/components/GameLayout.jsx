import React from 'react';
import './GameLayout.css';

const GameLayout = ({ title, children, onBack, score, timer, instructions }) => {
    return (
        <div className="game-layout">
            <div className="game-header glass-card">
                <button className="back-button btn-secondary" onClick={onBack}>
                    ← Back
                </button>
                <h2 className="game-layout-title">{title}</h2>
                <div className="game-stats">
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
