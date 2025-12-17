import React from 'react';
import './GameCard.css';

const GameCard = ({ title, description, category, icon, onClick, gradient }) => {
  return (
    <div className="game-card glass-card" onClick={onClick} style={{'--card-gradient': gradient}}>
      <div className="game-card-icon">
        <span className="icon-emoji">{icon}</span>
      </div>
      <div className="game-card-content">
        <div className="game-category">{category}</div>
        <h3 className="game-title">{title}</h3>
        <p className="game-description">{description}</p>
      </div>
      <div className="game-card-overlay"></div>
    </div>
  );
};

export default GameCard;
