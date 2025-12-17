import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './RapidAddition.css';

const RapidAddition = ({ onBack }) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [gameActive, setGameActive] = useState(false);

    useEffect(() => {
        if (gameActive && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setGameActive(false);
        }
    }, [gameActive, timeLeft]);

    const startGame = () => {
        setScore(0);
        setTimeLeft(60);
        setGameActive(true);
        generateProblem();
    };

    const generateProblem = () => {
        setNum1(Math.floor(Math.random() * 50) + 1);
        setNum2(Math.floor(Math.random() * 50) + 1);
        setUserAnswer('');
    };

    const handleSubmit = () => {
        if (parseInt(userAnswer) === num1 + num2) {
            setScore(score + 1);
            generateProblem();
        } else {
            setUserAnswer('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <GameLayout
            title="Rapid Addition"
            onBack={onBack}
            score={score}
            timer={gameActive ? timeLeft : null}
            instructions="Solve as many addition problems as you can in 60 seconds!"
        >
            <div className="rapid-addition-container">
                {!gameActive ? (
                    <div className="start-screen">
                        <button className="btn btn-primary" onClick={startGame}>
                            Start Game
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="problem glass-card">
                            <div className="problem-text">
                                {num1} + {num2} = ?
                            </div>
                        </div>

                        <div className="answer-section">
                            <input
                                type="number"
                                className="answer-input glass-card"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Answer"
                                autoFocus
                            />
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </>
                )}
            </div>
        </GameLayout>
    );
};

export default RapidAddition;
