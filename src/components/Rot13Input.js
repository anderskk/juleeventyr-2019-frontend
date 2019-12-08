import React, { useState, useEffect, useRef } from 'react';

const rot13 = charOrNum => {
    if (isNaN(parseInt(charOrNum))) {
        const firstHalf = ['abcdefghijklm'];
        const secondHalf = ['nopqrstuvwxyz'];
        return 
    }
    return (parseInt(charOrNum) + 5) % 10; // 2 => 7, 5 => 0, 6 => 1
}

const Rot13Input = () => {
    const [inputText, setInputText] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        const pasteBox = document.getElementById("no-paste");
        pasteBox.onpaste = e => {
            e.preventDefault();
            return false;
        };
    }, [inputRef]);

    return (
        <label>
            <div>Gruppenavn</div>
            <input
                ref={ inputRef }
                type="text"
                value={ inputText }
                onChange={ (e) => {
                    e.preventDefault();
                    const value = e.target.value;
                    const lastChar = value[value.length - 1];
                    const rot13Char = rot13(lastChar);
                }}
            />
        </label>
    );
};
