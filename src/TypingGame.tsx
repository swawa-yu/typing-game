import React, { useState, useEffect, useRef } from 'react';
import Keyboard from './Keyboard';

const words = ['apple', 'Date', 'Fig', 'grape', '2024-06-05', '"Hello, World!"'];

const TypingGame: React.FC = () => {
    const [currentWord, setCurrentWord] = useState('');
    const [input, setInput] = useState('');
    const [score, setScore] = useState(0);
    const [isShiftPressed, setIsShiftPressed] = useState(false);
    const [isFocused, setIsFocused] = useState(true);

    const inputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    }, [score]);

    useEffect(() => {
        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);

        const inputElement = inputRef.current;
        if (inputElement) {
            inputElement.addEventListener('focus', handleFocus);
            inputElement.addEventListener('blur', handleBlur);
        }

        return () => {
            if (inputElement) {
                inputElement.removeEventListener('focus', handleFocus);
                inputElement.removeEventListener('blur', handleBlur);
            }
        };
    }, []);

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
                ref={inputRef}
                tabIndex={0}
                onKeyDown={handleKeyPress}
                onKeyUp={handleKeyUp}
                className="border p-2 mb-4"
                style={{ height: '3rem', lineHeight: '3rem', position: 'relative' }}
            >
                {isFocused ? input : <span className="text-red-500 absolute inset-0 flex items-center justify-center">Click here to focus and type</span>}
            </div>
            <Keyboard currentChar={currentWord[input.length]} isShiftPressed={isShiftPressed} />
        </div>
    );
};

export default TypingGame;