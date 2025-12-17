import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';
import './SynonymFinder.css';

const synonymPairs = [
    { word: 'HAPPY', synonyms: ['JOYFUL', 'GLAD', 'CHEERFUL'], nonSynonyms: ['SAD', 'ANGRY', 'TIRED'] },
    { word: 'BIG', synonyms: ['LARGE', 'HUGE', 'ENORMOUS'], nonSynonyms: ['SMALL', 'TINY', 'LITTLE'] },
    { word: 'SMART', synonyms: ['CLEVER', 'BRIGHT', 'INTELLIGENT'], nonSynonyms: ['DULL', 'SLOW', 'SIMPLE'] },
    { word: 'FAST', synonyms: ['QUICK', 'RAPID', 'SWIFT'], nonSynonyms: ['SLOW', 'LAZY', 'GRADUAL'] },
    { word: 'BEAUTIFUL', synonyms: ['PRETTY', 'LOVELY', 'GORGEOUS'], nonSynonyms: ['UGLY', 'PLAIN', 'DULL'] }
];

const SynonymFinder = ({ onBack }) => {
    const [currentPair, setCurrentPair] = useState(null);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        generateChallenge();
    }, []);

    const generateChallenge = () => {
        const pair = synonymPairs[Math.floor(Math.random() * synonymPairs.length)];
        const correctSyn = pair.synonyms[Math.floor(Math.random() * pair.synonyms.length)];
        const incorrectOptions = pair.nonSynonyms.slice(0, 3);

        const allOptions = [correctSyn, ...incorrectOptions].sort(() => Math.random() - 0.5);

        setCurrentPair({ ...pair, correctAnswer: correctSyn });
        setOptions(allOptions);
        setRound(round + 1);
        setFeedback('');
    };

    const handleAnswer = (word) => {
        if (word === currentPair.correctAnswer) {
            setFeedback('✅ Correct synonym!');
            setScore(score + 10);
            setTimeout(generateChallenge, 1500);
        } else {
            setFeedback('❌ Not a synonym');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout
            title="Synonym Finder"
            onBack={onBack}
            score={score}
            instructions="Find the word that means the same as the target!"
        >
            <div className="synonym-container">
                {currentPair && (
                    <>
                        <div className="target-word glass-card">
                            <div className="label">Find a synonym for:</div>
                            <div className="word">{currentPair.word}</div>
                        </div>

                        <div className="synonym-options">
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

export default SynonymFinder;
