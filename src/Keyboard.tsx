import React from 'react';

interface KeyboardProps {
    currentChar: string;
    isShiftPressed: boolean;
}

const Keyboard: React.FC<KeyboardProps> = ({ currentChar, isShiftPressed }) => {
    const rows = [
        [
            { normal: '1', shift: '!' },
            { normal: '2', shift: '@' },
            { normal: '3', shift: '#' },
            { normal: '4', shift: '$' },
            { normal: '5', shift: '%' },
            { normal: '6', shift: '^' },
            { normal: '7', shift: '&' },
            { normal: '8', shift: '*' },
            { normal: '9', shift: '(' },
            { normal: '0', shift: ')' },
            { normal: '-', shift: '_' },
            { normal: '=', shift: '+' },
            { normal: 'delete', shift: 'delete' }
        ],
        [
            { normal: 'q', shift: 'Q' },
            { normal: 'w', shift: 'W' },
            { normal: 'e', shift: 'E' },
            { normal: 'r', shift: 'R' },
            { normal: 't', shift: 'T' },
            { normal: 'y', shift: 'Y' },
            { normal: 'u', shift: 'U' },
            { normal: 'i', shift: 'I' },
            { normal: 'o', shift: 'O' },
            { normal: 'p', shift: 'P' },
            { normal: '[', shift: '{' },
            { normal: ']', shift: '}' },
            { normal: '\\', shift: '|' }
        ],
        [
            { normal: 'a', shift: 'A' },
            { normal: 's', shift: 'S' },
            { normal: 'd', shift: 'D' },
            { normal: 'f', shift: 'F' },
            { normal: 'g', shift: 'G' },
            { normal: 'h', shift: 'H' },
            { normal: 'j', shift: 'J' },
            { normal: 'k', shift: 'K' },
            { normal: 'l', shift: 'L' },
            { normal: ';', shift: ':' },
            { normal: '\'', shift: '"' },
            { normal: 'return', shift: 'return' }
        ],
        [
            { normal: 'shift', shift: 'shift' },
            { normal: 'z', shift: 'Z' },
            { normal: 'x', shift: 'X' },
            { normal: 'c', shift: 'C' },
            { normal: 'v', shift: 'V' },
            { normal: 'b', shift: 'B' },
            { normal: 'n', shift: 'N' },
            { normal: 'm', shift: 'M' },
            { normal: ',', shift: '<' },
            { normal: '.', shift: '>' },
            { normal: '/', shift: '?' },
            { normal: 'shift', shift: 'shift' }
        ],
        [
            { normal: 'fn', shift: 'fn' },
            { normal: 'control', shift: 'control' },
            { normal: 'option', shift: 'option' },
            { normal: 'command', shift: 'command' },
            { normal: 'space', shift: 'space' },
            { normal: 'command', shift: 'command' },
            { normal: 'option', shift: 'option' },
            { normal: 'left', shift: 'left' },
            { normal: 'up', shift: 'up' },
            { normal: 'down', shift: 'down' },
            { normal: 'right', shift: 'right' }
        ]
    ];

    return (
        <div className="flex flex-col items-center">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex space-x-1 mb-1">
                    {row.map((key, keyIndex) => {
                        const displayChar = isShiftPressed ? key.shift : key.normal;
                        const secondaryChar = isShiftPressed ? key.normal : key.shift;
                        const isSpecialKey = ['shift', 'return', 'delete', 'space', 'command', 'option', 'control', 'fn', 'left', 'up', 'down', 'right'].includes(key.normal);

                        return (
                            <div
                                key={keyIndex}
                                className={`p-2 border rounded text-center ${currentChar === displayChar ? 'bg-blue-500 text-white' : ''}`}
                                style={{ minWidth: '2.5rem', position: 'relative' }}
                            >
                                {isSpecialKey ? (
                                    <span>{displayChar}</span>
                                ) : (
                                    <>
                                        <span className={`'text-black'`}>{displayChar}</span>
                                        <span className={`absolute top-0 right-0 text-xs text-gray-400`}>
                                            {secondaryChar}
                                        </span>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Keyboard;