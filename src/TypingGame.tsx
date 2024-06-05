import React, { useState, useEffect } from 'react';
import Keyboard from './Keyboard';

const words = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape'];
const TypingGame: React.FC = () => {
    const [currentWord, setCurrentWord] = useState('');
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [isShiftPressed, setIsShiftPressed] = useState(false);

    useEffect(() => {
        setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    }, [score]);

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Shift') {
            setIsShiftPressed(true);
            return;
        }

        const char = event.key;

        if (char === currentWord[input.length]) {
            setInput(input + char);
            if (input + char === currentWord) {
                setScore(score + 1);
                setInput('');
            }
        }
    };

    const handleKeyUp = (event: React.KeyboardEvent) => {
        if (event.key === 'Shift') {
            setIsShiftPressed(false);
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
                onKeyUp={handleKeyUp}
                className="border p-2 mb-4"
                style={{ height: '3rem', lineHeight: '3rem' }} // 高さと行の高さを固定
            >
                {input}
            </div>
            <Keyboard currentChar={currentWord[input.length]} isShiftPressed={isShiftPressed} />
        </div>
    );
};

export default TypingGame;