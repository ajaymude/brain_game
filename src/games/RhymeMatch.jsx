import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';
import './RhymeMatch.css';

const rhymePairs = [
    { word: 'CAT', rhymes: ['HAT', 'BAT', 'MAT'], nonRhymes: ['DOG', 'PIG', 'COW'] },
    { word: 'TREE', rhymes: ['BEE', 'SEA', 'KEY'], nonRhymes: ['SUN', 'CAR', 'BOX'] },
    { word: 'LIGHT', rhymes: ['NIGHT', 'SIGHT', 'FIGHT'], nonRhymes: ['DARK', 'LAMP', 'GLOW'] },
    { word: 'RAIN', rhymes: ['TRAIN', 'PAIN', 'GAIN'], nonRhymes: ['SNOW', 'STORM', 'CLOUD'] },
    { word: 'STAR', rhymes: ['CAR', 'FAR', 'BAR'], nonRhymes: ['MOON', 'SKY', 'SUN'] }
];

const RhymeMatch = ({ onBack }) => {
    const [currentPair, setCurrentPair] = useState(null);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);
    const [feedback, setFeedback] = useState('');

    useState(() => {
        generateChallenge();
    }, []);

    const generateChallenge = () => {
        const pair = rhymePairs[Math.floor(Math.random() * rhymePairs.length)];
        const correctRhyme = pair.rhymes[Math.floor(Math.random() * pair.rhymes.length)];
        const incorrectOptions = pair.nonRhymes.slice(0, 3);

        const allOptions = [correctRhyme, ...incorrectOptions].sort(() => Math.random() - 0.5);

        setCurrentPair({ ...pair, correctAnswer: correctRhyme });
        setOptions(allOptions);
        setRound(round + 1);
        setFeedback('');
    };

    const handleAnswer = (word) => {
        if (word === currentPair.correctAnswer) {
            setFeedback('✅ Correct! They rhyme!');
            setScore(score + 10);
            setTimeout(generateChallenge, 1500);
        } else {
            setFeedback('❌ Wrong! They don\'t rhyme.');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout
            title="Rhyme Match"
            onBack={onBack}
            score={score}
            instructions="Select the word that rhymes with the target word!"
        >
            <div className="rhyme-container">
                {currentPair && (
                    <>
                        <div className="round-info">Round {round}</div>

                        <div className="target-word glass-card">
                            <div className="label">Find a rhyme for:</div>
                            <div className="word">{currentPair.word}</div>
                        </div>

                        <div className="rhyme-options">
                            {options.map((word, idx) => (
                                <button
                                    key={idx}
                                    className="option-btn glass-card"
                                    onClick={() => handleAnswer(word)}
                                >
                                    {word}
                                </button>
                            ))}
                        </div>

                        {feedback && (
                            <div className={`feedback ${feedback.includes('✅') ? 'correct' : 'incorrect'}`}>
                                {feedback}
                            </div>
                        )}
                    </>
                )}
            </div>
        </GameLayout>
    );
};

export default RhymeMatch;
