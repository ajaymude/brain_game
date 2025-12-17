import React, { useState } from 'react';
import GameLayout from '../components/GameLayout';

const OrderedRecall = ({ onBack }) => {
    const [words, setWords] = useState([]);
    const [userWords, setUserWords] = useState([]);
    const [currentInput, setCurrentInput] = useState('');
    const [phase, setPhase] = useState('start');
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(4);

    const wordList = ['CAT', 'DOG', 'SUN', 'MOON', 'TREE', 'BIRD', 'FISH', 'STAR', 'RAIN', 'WIND'];

    const startGame = () => {
        const selected = [];
        while (selected.length < level) {
            const word = wordList[Math.floor(Math.random() * wordList.length)];
            if (!selected.includes(word)) selected.push(word);
        }
        setWords(selected);
        setUserWords([]);
        setCurrentInput('');
        setPhase('show');
        setTimeout(() => setPhase('recall'), 3000);
    };

    const handleSubmit = () => {
        if (currentInput.trim()) {
            setUserWords([...userWords, currentInput.toUpperCase()]);
            setCurrentInput('');
            if (userWords.length + 1 === level) {
                checkAnswer([...userWords, currentInput.toUpperCase()]);
            }
        }
    };

    const checkAnswer = (answers) => {
        if (answers.every((w, i) => w === words[i])) {
            setScore(score + level * 5);
            setLevel(level + 1);
            setTimeout(startGame, 1000);
        } else {
            setPhase('failed');
        }
    };

    return (
        <GameLayout title="Ordered Recall" onBack={onBack} score={score} instructions="Remember the words in order!">
            <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', alignItems: 'center', minHeight: '500px', justifyContent: 'center' }}>
                {phase === 'start' && (
                    <button className="btn btn-primary" onClick={startGame}>Start Level {level}</button>
                )}
                {phase === 'show' && (
                    <>
                        <div>Memorize these words!</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', fontSize: '2rem', fontWeight: '700' }}>
                            {words.map((w, i) => <div key={i}>{w}</div>)}
                        </div>
                    </>
                )}
                {phase === 'recall' && (
                    <>
                        <div>Type the words in order:</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                            {userWords.map((w, i) => <div key={i} style={{ fontSize: '1.5rem' }}>{i + 1}. {w}</div>)}
                        </div>
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                            <input type="text" className="glass-card" value={currentInput} onChange={(e) => setCurrentInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSubmit()} style={{ padding: '12px', fontSize: '1.2rem' }} placeholder={`Word ${userWords.length + 1}`} autoFocus />
                            <button className="btn btn-primary" onClick={handleSubmit}>Add</button>
                        </div>
                    </>
                )}
                {phase === 'failed' && (
                    <div className="glass-card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                        <h2>Game Over</h2>
                        <p>Level: {level}</p>
                        <button className="btn btn-primary" onClick={() => { setLevel(4); setScore(0); startGame(); }}>Try Again</button>
                    </div>
                )}
            </div>
        </GameLayout>
    );
};

export default OrderedRecall;
