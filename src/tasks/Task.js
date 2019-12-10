import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/erlang-dark.css';
import Button from 'react-bootstrap/Button';
import { StateContext, DispatchContext, baseUrl } from '../App';
import axios from 'axios';
import { taskComplete, taskFail, lastTask405 } from '../actions/actions';


const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(window.location.search);
    return results && decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const Task = ({ taskName, initCode, oppgavetekst, leverSvarTekst }) => {
    debugger
    const { currentTaskNumber } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const [code, setCode] = useState(initCode);

    const submitAnswer = async (taskName, code) => {
        const user = getUrlParameter('username');
        const url = `${baseUrl}/api/checkanswer`;
        if (taskName === 'swapPairs') {
            try {
                await axios.put(
                    url, 
                    { task: taskName, code, user }
                ); // Denne skal gi 405 og dermed kaste feil
            } catch (e) {
                dispatch(lastTask405());
            }
            
        } else {
            const result = await axios.post(
                url, 
                { task: taskName, code, user }
            );
            const { taskSuccess } = result.data;
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
            <h2>{ `Oppgave ${currentTaskNumber} av 4` }</h2>
            <div>{ oppgavetekst }</div>
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
    oppgavetekst: PropTypes.any.isRequired,
    taskName: PropTypes.string.isRequired,
    leverSvarTekst: PropTypes.string.isRequired
};

export default Task;
