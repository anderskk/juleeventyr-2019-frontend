import React, { useState, useEffect, useRef } from 'react';

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

const rot13 = charOrNum => {
    if (isNaN(parseInt(charOrNum))) {
        const firstHalf = 'abcdefghijklm';
        const secondHalf = 'nopqrstuvwxyz';
        if (firstHalf.indexOf(charOrNum) !== -1) {
            console.log('bytter fra første halvdel')
            return secondHalf[firstHalf.indexOf(charOrNum)]
        }
        if (secondHalf.indexOf(charOrNum) !== -1) {
            console.log('bytter fra andre halvdel')
            return firstHalf[secondHalf.indexOf(charOrNum)]
        }
        console.log('bytter ingenting')
        return charOrNum;
    }
    console.log('bytter tall')
    return (parseInt(charOrNum) + 5) % 10; // 2 => 7, 5 => 0, 6 => 1
}

const Rot13Input = () => {
    const [inputText, setInputText] = useState('');
    const inputRef = useRef(null);

    const handlerCopy = e => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
    }

    return (
        
        <label>
            <div>Gruppenavn</div>
            <input
                ref={ inputRef }
                type="text"
                value={ inputText }
                onCopy={ handlerCopy }
                onChange={ (e) => {
                    e.preventDefault();
                    const value = e.target.value;

                    if (value.length === 0) {
                        setInputText('');
                    } else if (value.length > inputText.length + 1) {
                        // do nothing
                    } else {
                        const lastChar = value[value.length - 1];
                        const rot13Char = rot13(lastChar);
                        setInputText(setCharAt(value, value.length - 1, rot13Char));
                    }
                }}
            />
        </label>
    );
};

export default Rot13Input;
