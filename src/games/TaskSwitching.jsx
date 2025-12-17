import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './TaskSwitching.css';

const TaskSwitching = ({ onBack }) => {
    const [task, setTask] = useState('number'); // 'number' or 'color'
    const [current, setCurrent] = useState({ number: 0, color: '' });
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);
    const [feedback, setFeedback] = useState('');

    const colors = ['Red', 'Blue', 'Green', 'Yellow'];
    const colorMap = { Red: '#ef4444', Blue: '#3b82f6', Green: '#10b981', Yellow: '#eab308' };

    useEffect(() => {
        generateChallenge();
    }, []);

    const generateChallenge = () => {
        const num = Math.floor(Math.random() * 9) + 1;
        const col = colors[Math.floor(Math.random() * colors.length)];
        const taskType = Math.random() < 0.5 ? 'number' : 'color';

        setCurrent({ number: num, color: col });
        setTask(taskType);
        setRound(round + 1);
        setFeedback('');
    };

    const handleAnswer = (answer) => {
        const correct = (task === 'number' && answer === (current.number % 2 === 0 ? 'even' : 'odd')) ||
            (task === 'color' && answer === current.color);

        if (correct) {
            setFeedback('✅');
            setScore(score + 10);
            setTimeout(generateChallenge, 500);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1000);
        }
    };

    return (
        <GameLayout
            title="Task Switching"
            onBack={onBack}
            score={score}
            instructions="Switch between tasks! Follow the instruction shown."
        >
            <div className="task-switching-container">
                <div className="task-instruction glass-card">
                    {task === 'number' ? 'Is the NUMBER even or odd?' : 'What COLOR is shown?'}
                </div>

                <div className="stimulus glass-card">
                    <div className="number" style={{ color: colorMap[current.color] }}>
                        {current.number}
                    </div>
                </div>

                {task === 'number' ? (
                    <div className="options">
                        <button className="btn btn-primary option" onClick={() => handleAnswer('even')}>
                            Even
                        </button>
                        <button className="btn btn-primary option" onClick={() => handleAnswer('odd')}>
                            Odd
                        </button>
                    </div>
                ) : (
                    <div className="options color-options">
                        {colors.map(col => (
                            <button
                                key={col}
                                className="color-option"
                                style={{ backgroundColor: colorMap[col] }}
                                onClick={() => handleAnswer(col)}
                            >
                                {col}
                            </button>
                        ))}
                    </div>
                )}

                {feedback && <div className="feedback-icon">{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default TaskSwitching;
