import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './WordAssociation.css';

const pairs = [
    { word1: 'HOT', word2: 'COLD', type: 'opposite' },
    { word1: 'DAY', word2: 'NIGHT', type: 'opposite' },
    { word1: 'KING', word2: 'QUEEN', type: 'related' },
    { word1: 'SALT', word2: 'PEPPER', type: 'related' },
    { word1: 'UP', word2: 'DOWN', type: 'opposite' }
];

const WordAssociation = ({ onBack }) => {
    const [pair, setPair] = useState(pairs[0]);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        generatePair();
    }, []);

    const generatePair = () => {
        setPair(pairs[Math.floor(Math.random() * pairs.length)]);
        setFeedback('');
    };

    const handleAnswer = (answer) => {
        if (answer === pair.type) {
            setFeedback('✅ Correct!');
            setScore(score + 5);
            setTimeout(generatePair, 1500);
        } else {
            setFeedback('❌ Wrong!');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout
            title="Word Association"
            onBack={onBack}
            score={score}
            instructions="Are the words opposites or related?"
        >
            <div className="word-assoc-container">
                <div className="words-display glass-card">
                    <div className="word">{pair.word1}</div>
                    <div className="connector">↔</div>
                    <div className="word">{pair.word2}</div>
                </div>

                <div className="answer-buttons">
                    <button className="btn btn-primary" onClick={() => handleAnswer('opposite')}>
                        Opposites
                    </button>
                    <button className="btn btn-primary" onClick={() => handleAnswer('related')}>
                        Related
                    </button>
                </div>

                {feedback && (
                    <div className={`feedback ${feedback.includes('✅') ? 'correct' : 'incorrect'}`}>
                        {feedback}
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default WordAssociation;
