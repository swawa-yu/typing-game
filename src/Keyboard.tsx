import React, { useState, useEffect } from 'react';

interface KeyboardProps {
    currentChar: string;
    isShiftPressed: boolean;
}

const Keyboard: React.FC<KeyboardProps> = ({ currentChar, isShiftPressed }) => {
    const [pressedKey, setPressedKey] = useState<string | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            setPressedKey(event.key);
        };

        const handleKeyUp = () => {
            setPressedKey(null);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const rows = [
        [
            { normal: '`', shift: '~', width: 'w-12' },
            { normal: '1', shift: '!', width: 'w-12' },
            { normal: '2', shift: '@', width: 'w-12' },
            { normal: '3', shift: '#', width: 'w-12' },
            { normal: '4', shift: '$', width: 'w-12' },
            { normal: '5', shift: '%', width: 'w-12' },
            { normal: '6', shift: '^', width: 'w-12' },
            { normal: '7', shift: '&', width: 'w-12' },
            { normal: '8', shift: '*', width: 'w-12' },
            { normal: '9', shift: '(', width: 'w-12' },
            { normal: '0', shift: ')', width: 'w-12' },
            { normal: '-', shift: '_', width: 'w-12' },
            { normal: '=', shift: '+', width: 'w-12' },
            { normal: 'delete', shift: 'delete', width: 'w-20' }
        ],
        [
            { normal: 'tab', shift: 'tab', width: 'w-20' },
            { normal: 'q', shift: 'Q', width: 'w-12' },
            { normal: 'w', shift: 'W', width: 'w-12' },
            { normal: 'e', shift: 'E', width: 'w-12' },
            { normal: 'r', shift: 'R', width: 'w-12' },
            { normal: 't', shift: 'T', width: 'w-12' },
            { normal: 'y', shift: 'Y', width: 'w-12' },
            { normal: 'u', shift: 'U', width: 'w-12' },
            { normal: 'i', shift: 'I', width: 'w-12' },
            { normal: 'o', shift: 'O', width: 'w-12' },
            { normal: 'p', shift: 'P', width: 'w-12' },
            { normal: '[', shift: '{', width: 'w-12' },
            { normal: ']', shift: '}', width: 'w-12' },
            { normal: '\\', shift: '|', width: 'w-12' }
        ],
        [
            { normal: 'caps lock', shift: 'caps lock', width: 'w-24' },
            { normal: 'a', shift: 'A', width: 'w-12' },
            { normal: 's', shift: 'S', width: 'w-12' },
            { normal: 'd', shift: 'D', width: 'w-12' },
            { normal: 'f', shift: 'F', width: 'w-12' },
            { normal: 'g', shift: 'G', width: 'w-12' },
            { normal: 'h', shift: 'H', width: 'w-12' },
            { normal: 'j', shift: 'J', width: 'w-12' },
            { normal: 'k', shift: 'K', width: 'w-12' },
            { normal: 'l', shift: 'L', width: 'w-12' },
            { normal: ';', shift: ':', width: 'w-12' },
            { normal: '\'', shift: '"', width: 'w-12' },
            { normal: 'return', shift: 'return', width: 'w-24' }
        ],
        [
            { normal: 'shift', shift: 'shift', width: 'w-28' },
            { normal: 'z', shift: 'Z', width: 'w-12' },
            { normal: 'x', shift: 'X', width: 'w-12' },
            { normal: 'c', shift: 'C', width: 'w-12' },
            { normal: 'v', shift: 'V', width: 'w-12' },
            { normal: 'b', shift: 'B', width: 'w-12' },
            { normal: 'n', shift: 'N', width: 'w-12' },
            { normal: 'm', shift: 'M', width: 'w-12' },
            { normal: ',', shift: '<', width: 'w-12' },
            { normal: '.', shift: '>', width: 'w-12' },
            { normal: '/', shift: '?', width: 'w-12' },
            { normal: 'shift', shift: 'shift', width: 'w-32' }
        ],
        [
            { normal: 'fn', shift: 'fn', width: 'w-12' },
            { normal: 'control', shift: 'control', width: 'w-12' },
            { normal: 'option', shift: 'option', width: 'w-12' },
            { normal: 'command', shift: 'command', width: 'w-16' },
            { normal: 'space', shift: 'space', width: 'w-64' },
            { normal: 'command', shift: 'command', width: 'w-16' },
            { normal: 'option', shift: 'option', width: 'w-12' },
            { normal: '←', shift: '←', width: 'w-9' },
            { normal: '↑', shift: '↑', width: 'w-9' },
            { normal: '↓', shift: '↓', width: 'w-9' },
            { normal: '→', shift: '→', width: 'w-9' }
        ]
    ];

    // rows[i][j].shiftの集合
    const withShifts = rows.flatMap(row => row.map(key => key.shift)).filter(key => key !== undefined);

    return (
        <div className="flex flex-col items-center">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex space-x-1 mb-1">
                    {row.map((key, keyIndex) => {
                        const displayChar = isShiftPressed ? key.shift : key.normal;
                        const secondaryChar = isShiftPressed ? key.normal : key.shift;
                        const isSpecialKey = ['tab', 'caps lock', 'shift', 'return', 'delete', 'space', 'command', 'option', 'control', 'fn', '←', '↑', '↓', '→'].includes(key.normal);
                        const isToPress = currentChar === key.normal || currentChar === key.shift || (displayChar === 'shift' && withShifts.includes(currentChar));
                        const isPressed = pressedKey === key.normal || pressedKey === key.shift;

                        // isToPressのときの処理
                        // shift同時押しが必要でないキー: 青色にする
                        // shift同時押しが必要なキー: shiftが押されていないときは枠だけ青色、shiftが押されているとき青色にする
                        // shiftキー: 青色にする

                        const styleNormal = "text-black";
                        const styleToPress = "bg-blue-500 text-white";
                        const styleToPressWaitingShift = "border border-blue-500";
                        const stylePressed = "bg-red-500 text-white";

                        return (
                            <div
                                key={keyIndex}
                                className={`
                                    p-2 border rounded text-center ${key.width}
                                    ${isPressed ? stylePressed :
                                        isToPress ?
                                            (key.shift === currentChar && !isShiftPressed ?
                                                styleToPressWaitingShift :
                                                styleToPress) :
                                            styleNormal
                                    }
                `}
                                style={{ position: 'relative' }}
                            >
                                <span className={`${isSpecialKey ? "text-xxs" : ""}`}>
                                    {displayChar}
                                </span>
                                {isSpecialKey ? null : <span className={`absolute top-0 right-0 text-xs text-gray-400`}>{secondaryChar}</span>}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default Keyboard;