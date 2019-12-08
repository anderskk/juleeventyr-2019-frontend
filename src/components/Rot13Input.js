import React, { useState, useContext } from 'react';
import { DispatchContext, getUrlParameter } from '../App';
import Button from 'react-bootstrap/Button';
import { harMatchetNavn } from '../actions/actions';

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

const rot13 = charOrNum => {
    if (isNaN(parseInt(charOrNum))) {
        const firstHalf = 'abcdefghijklm';
        const secondHalf = 'nopqrstuvwxyz';
        if (firstHalf.indexOf(charOrNum) !== -1) {
            return secondHalf[firstHalf.indexOf(charOrNum)]
        }
        if (secondHalf.indexOf(charOrNum) !== -1) {
            return firstHalf[secondHalf.indexOf(charOrNum)]
        }
        return charOrNum;
    }
    return (parseInt(charOrNum) + 5) % 10; // 2 => 7, 5 => 0, 6 => 1
}

const Rot13Input = () => {
    const [inputText, setInputText] = useState('');
    const dispatch = useContext(DispatchContext);
    const username = getUrlParameter('username');

    const handlerCopy = e => {
        e.preventDefault();
        e.nativeEvent.stopImmediatePropagation();
    }

    return (
        <>
        <label>
            <div>Gruppenavn</div>
            <input
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
                    } else if (value.length < inputText.length) {
                        setInputText(value);
                    } else {
                        const lastChar = value[value.length - 1];
                        const rot13Char = rot13(lastChar);
                        setInputText(setCharAt(value, value.length - 1, rot13Char));
                    }
                }}
            />
        </label>
        <Button 
            disabled={ inputText !== username }
            onClick={ () => {
                if (inputText === username) {
                    dispatch(harMatchetNavn());
                }
            } }>
            { 'Begynn på leksene' }
        </Button>
        </>
    );
};

export default Rot13Input;
