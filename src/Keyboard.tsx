import React from 'react';

interface KeyboardProps {
    currentChar: string;
}

const Keyboard: React.FC<KeyboardProps> = ({ currentChar }) => {
    const keys = 'abcdefghijklmnopqrstuvwxyz'.split('');

    return (
        <div className="grid grid-cols-10 gap-1">
            {keys.map((key) => (
                <div
                    key={key}
                    className={`p-2 border rounded ${currentChar === key ? 'bg-blue-500 text-white' : ''}`}
                >
                    {key}
                </div>
            ))}
        </div>
    );
};

export default Keyboard;