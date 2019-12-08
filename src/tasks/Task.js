import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/erlang-dark.css';
import Button from 'react-bootstrap/Button';
import { StateContext, DispatchContext } from '../App';
import axios from 'axios';
import { taskComplete, taskFail } from '../actions/actions';

/*
function getBiggestNumber(arr) {
    return arr.reduce((tmpBiggest, num) => num > tmpBiggest ? num : tmpBiggest, -Infinity);
}

function getNumbers(str) {
    return [...str].map(char => parseInt(char)).filter(char => !isNaN(char));
}

function removeDuplicates(arr) {
    return arr.reduce((tmpArr, element) => {
        if (tmpArr.includes(element)) {
            return tmpArr;
        }
        tmpArr.push(element);
        return tmpArr;
    }, [])
}

function toRoeverspraak(str) {
    return ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l','m', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']
        .reduce((tmpStr, konsonant) => tmpStr.replace(konsonant, `${konsonant}o${konsonant}`), str);
}
*/

const tasks = {
    1: {
        taskName: 'getBiggestNumber',
        initCode: `function getBiggestNumber(arr) {
    //code
}`,
        oppgavetekst: (<>
            <p>{ 'Skriv en funksjon, getBiggestNumber, som tar inn et array av tall og returnerer det største tallet i arrayet. Du kan ikke bruke Math.max' }</p>
            <p>{ 'F. eks. så skal ' }
                <span><code>{ 'getBiggestNumber([1, 2, 3, 4748, 5])' }</code></span>
                <span>{ ' returnere ' }</span>
                <span><code>{ '4748' }</code></span>
            </p>
            <p>{'Lykke tiiiiiil!'}</p>
        </>),
        leverSvarTekst: 'Lever svar'
    },
    2: {
        taskName: 'getNumbers',
        initCode: `function getNumbers(str) {
    //code
}`,
        oppgavetekst: (<>
            <p>{ 'Skriv en funksjon, getNumbers, som tar inn en string og returnerer et array som inneholder hvert tall i stringen.' }</p>
            <p>{ 'F. eks. så skal ' }
                <span><code>{ 'getNumbers(\'dndjk3grgb8g317t0j4tv8t2\')' }</code></span>
                <span>{ ' returnere ' }</span>
                <span><code>{ '[3, 8, 3, 1, 7, 0, 4, 8, 2]' }</code></span>
            </p>
            <p>{'Lykke tiiiiiil!'}</p>
        </>),
        leverSvarTekst: 'Værsågod, herr lærer'
    },
    3: {
        taskName: 'removeDuplicates',
        initCode: `function removeDuplicates(arr) {
    //code
}`,
        oppgavetekst: (<>
            <p>{'Skriv en funksjon, removeDuplicates, som tar inn et array og returnerer arrayet uten duplikater.'}</p>
            <p>{'F. eks. så skal ' }
                <span><code>{'removeDuplicates([\'hei\', \'hallo\', \'hei\', \'ha det\'])'}</code></span>
                <span>{ ' returnere ' }</span>
                <span><code>{ '[\'hei\', \'hallo\', \'ha det\']' }</code></span>
            </p>
            <p>{'Lykke tiiiiiil!'}</p>
        </>),
        leverSvarTekst: 'Her har du siste oppgave, kan jeg gå nå?'
    },
    4: {
        taskName: 'toRoeverspraak',
        initCode: `function toRoeverspraak(str) {
    //code
}`,
        oppgavetekst: (<>
            <p>
                <span>{'Skriv en funksjon, toRoeverspraak, som tar inn en string og returnerer '}</span>
                <a href="https://no.wikipedia.org/wiki/R%C3%B8verspr%C3%A5ket" target="blank">{ 'røverspråkversjonen' }</a>
                <span>{ ' av stringen.' }</span>
            </p>
            <p>{'F. eks. så skal ' }
                <span><code>{'toRoeverspraak(\'Hei, hvordan går det?\')'}</code></span>
                <span>{ ' returnere ' }</span>
                <span><code>{ '\'Hohei, hohvovorordodanon gogåror dodetot?\'' }</code></span>
            </p>
            <p>{'Lykke tiiiiiil!'}</p>
        </>),
        leverSvarTekst: '#&¤$@!)'
    }
};

const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.search);
    return results && decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// skriv inn gruppenavnet => rot13 

const Task = () => {
    const { currentTaskNumber } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const { taskName, initCode, oppgavetekst, leverSvarTekst } = tasks[currentTaskNumber];
    const [code, setCode] = useState(initCode);

    const submitAnswer = async (taskName, code) => {
        const user = getUrlParameter('username');
        const url = 'http://localhost:5000/api/checkanswer';
        // const url = 'https://tempoetappe-backend.herokuapp.com/api/checkanswer';
        if (taskName === 'getBiggestNumber') {
        // if (taskName === 'toRoeverspraak') {
            try {
                const result = await axios.put(
                    url, 
                    { task: taskName, code, user }
                );
            } catch (e) {
                dispatch()
            }
            
        } else {
            const result = await axios.post(
                url, 
                { task: taskName, code, user }
            );
            const { taskSuccess, nextUrl } = result.data;
            if (taskSuccess === true) {
                dispatch(taskComplete());
            } else {
                dispatch(taskFail());
            }
        }
    };

    return (
        <div className="task-container">
            <h1>{ 'Kongelige lekser' }</h1>
            <h2>{ `Oppgave ${currentTaskNumber} av 3` }</h2>
            <p>{ oppgavetekst }</p>
            <CodeMirror 
                value={ code }
                onChange={ (val) => setCode(val) }
                options={ {
                    mode: 'javascript',
                    lineNumbers: true,
                    theme: 'erlang-dark'
                } } />
            <Button
                onClick={ () => submitAnswer(taskName, code) }
                className="submit-answer-button"
            >
                { leverSvarTekst }
            </Button>
        </div>
    );
};

Task.propTypes = {
    initCode: PropTypes.string.isRequired,
    submitAnswer: PropTypes.func.isRequired,
    taskName: PropTypes.string.isRequired,
    taskNumber: PropTypes.number.isRequired
};

export default Task;
