import React, { useState, useEffect } from 'react';
import Keyboard from './Keyboard';

const words = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape'];

const TypingGame: React.FC = () => {
    const [currentWord, setCurrentWord] = useState('');
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);

    useEffect(() => {
        setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    }, [score]);

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === currentWord[input.length]) {
            setInput(input + event.key);
            if (input + event.key === currentWord) {
                setScore(score + 1);
                setInput('');
            }
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Typing Game</h1>
            <div className="text-xl mb-2">Word: {currentWord}</div>
            <div className="text-xl mb-2">Score: {score}</div>
            <div
                tabIndex={0}
                onKeyDown={handleKeyPress}
                className="border p-2 mb-4"
            >
                {input}
            </div>
            <Keyboard currentChar={currentWord[input.length]} />
        </div>
    );
};

export default TypingGame;