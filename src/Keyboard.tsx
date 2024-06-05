import React from 'react';

interface KeyboardProps {
    currentChar: string;
}

const Keyboard: React.FC<KeyboardProps> = ({ currentChar }) => {
    const rows = [
        'qwertyuiop',
        'asdfghjkl',
        'zxcvbnm'
    ];

    return (
        <div className="flex flex-col items-center">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex space-x-1 mb-1">
                    {row.split('').map((key) => (
                        <div
                            key={key}
                            className={`p-2 border rounded ${currentChar === key ? 'bg-blue-500 text-white' : ''}`}
                        >
                            {key}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Keyboard;