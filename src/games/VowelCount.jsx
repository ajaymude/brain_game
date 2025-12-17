import React, { useState, useEffect } from 'react';
import GameLayout from '../components/GameLayout';

const VowelCount = ({ onBack }) => {
    const [word, setWord] = useState('');
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState('');

    const words = ['PROGRAMMING', 'EDUCATION', 'BEAUTIFUL', 'DANGEROUS', 'IMPORTANT', 'WONDERFUL', 'EXCITING'];

    const generateProblem = () => {
        const w = words[Math.floor(Math.random() * words.length)];
        setWord(w);
        setUserAnswer('');
        setFeedback('');
    };

    useEffect(() => {
        generateProblem();
    }, []);

    const countVowels = (w) => {
        return w.split('').filter(c => 'AEIOU'.includes(c)).length;
    };

    const handleSubmit = () => {
        if (parseInt(userAnswer) === countVowels(word)) {
            setFeedback('✅');
            setScore(score + 5);
            setTimeout(generateProblem, 1000);
        } else {
            setFeedback('❌');
            setTimeout(() => setFeedback(''), 1500);
        }
    };

    return (
        <GameLayout title="Vowel Counter" onBack={onBack} score={score} instructions="How many vowels?">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                    <div style={{ fontSize: '3.5rem', fontWeight: '900', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                        {word}
                    </div>
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

export default VowelCount;
