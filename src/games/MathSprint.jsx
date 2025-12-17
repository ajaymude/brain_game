import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './MathSprint.css';

const MathSprint = ({ onBack }) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [operator, setOperator] = useState('+');
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [gameOver, setGameOver] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [difficulty, setDifficulty] = useState(1);

    useEffect(() => {
        generateProblem();
    }, [difficulty]);

    useEffect(() => {
        if (timeLeft > 0 && !gameOver) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setGameOver(true);
        }
    }, [timeLeft, gameOver]);

    const generateProblem = () => {
        const operators = ['+', '-', '×'];
        const op = operators[Math.floor(Math.random() * operators.length)];
        setOperator(op);

        const maxNum = 10 + (difficulty * 5);
        const n1 = Math.floor(Math.random() * maxNum) + 1;
        const n2 = Math.floor(Math.random() * maxNum) + 1;

        if (op === '-') {
            setNum1(Math.max(n1, n2));
            setNum2(Math.min(n1, n2));
        } else {
            setNum1(n1);
            setNum2(n2);
        }
    };

    const getCorrectAnswer = () => {
        switch (operator) {
            case '+': return num1 + num2;
            case '-': return num1 - num2;
            case '×': return num1 * num2;
            default: return 0;
        }
    };

    const checkAnswer = () => {
        if (!userAnswer) return;

        const correctAnswer = getCorrectAnswer();
        const numAnswer = parseInt(userAnswer);

        if (numAnswer === correctAnswer) {
            setFeedback('✅ Correct!');
            setScore(score + (10 * difficulty));
            setQuestionsAnswered(questionsAnswered + 1);

            if ((questionsAnswered + 1) % 5 === 0 && difficulty < 5) {
                setDifficulty(difficulty + 1);
            }

            setTimeout(() => {
                generateProblem();
                setUserAnswer('');
                setFeedback('');
            }, 500);
        } else {
            setFeedback('❌ Wrong!');
            setTimeout(() => setFeedback(''), 800);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    };

    const resetGame = () => {
        setScore(0);
        setTimeLeft(60);
        setGameOver(false);
        setQuestionsAnswered(0);
        setDifficulty(1);
        setUserAnswer('');
        setFeedback('');
        generateProblem();
    };

    return (
        <GameLayout
            title="Math Sprint"
            onBack={onBack}
            score={score}
            timer={timeLeft}
            instructions="Solve as many math problems as you can before time runs out!"
        >
            <div className="math-sprint-container">
                {gameOver ? (
                    <div className="game-over-message glass-card fade-in">
                        <h2>⏱️ Time's Up!</h2>
                        <p className="final-score">Final Score: {score}</p>
                        <p className="questions-count">Problems Solved: {questionsAnswered}</p>
                        <p className="difficulty-reached">Difficulty Reached: Level {difficulty}</p>
                        <button className="btn btn-primary" onClick={resetGame}>
                            Play Again
                        </button>
                    </div>
                ) : (
                    <div className="math-game">
                        <div className="difficulty-badge">
                            Level {difficulty}
                        </div>

                        <div className="math-problem glass-card">
                            <div className="problem-display">
                                <span className="number">{num1}</span>
                                <span className="operator">{operator}</span>
                                <span className="number">{num2}</span>
                                <span className="equals">=</span>
                                <span className="answer-placeholder">?</span>
                            </div>
                        </div>

                        <div className="answer-section">
                            <input
                                type="number"
                                className="math-input glass-card"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Answer"
                                autoFocus
                            />
                            <button className="btn btn-primary" onClick={checkAnswer}>
                                Submit
                            </button>
                        </div>

                        {feedback && (
                            <div className={`feedback ${feedback.includes('✅') ? 'correct' : 'incorrect'}`}>
                                {feedback}
                            </div>
                        )}

                        <div className="stats-display">
                            <div className="stat-box">
                                <div className="stat-label">Solved</div>
                                <div className="stat-value">{questionsAnswered}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default MathSprint;
