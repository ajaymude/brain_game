import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const LetterCount = ({ onBack }) => {
    const [word, setWord] = useState('');
    const [letter, setLetter] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const words = ['PROGRAMMING', 'CHALLENGE', 'JAVASCRIPT', 'MATHEMATICS', 'WONDERFUL', 'ELEPHANT', 'BEAUTIFUL', 'STRAWBERRY'];

    const generateProblem = () => {
        const w = words[Math.floor(Math.random() * words.length)];
        const l = w[Math.floor(Math.random() * w.length)];
        setWord(w);
        setLetter(l);
        setUserAnswer('');
        setFeedback('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const handleSubmit = () => {
        const count = word.split('').filter(c => c === letter).length;
        if (parseInt(userAnswer) === count) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateProblem, 1000);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout title="Letter Count" onBack={onBack} score={score} instructions="How many times does the letter appear?">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: 'var(--spacing-md)' }}>{word}</div>
                    <div style={{ fontSize: '2rem', color: 'var(--accent-cyan)' }}>Count the letter: {letter}</div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <input
                        type="number"
                        className="glass-card"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                        style={{ width: '100px', padding: '14px', fontSize: '1.5rem', textAlign: 'center' }}
                        placeholder="Count"
                        autoFocus
                    />
                    <button className="btn btn-primary" onClick={handleSubmit}>Check</button>
                </div>
                {feedback && <div style={{ fontSize: '4rem' }}>{feedback}</div>}
            </div>
        </GameLayout>
    );
};

export default LetterCount;
