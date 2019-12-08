import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../App';
import Task from './Task';
import FadeIn from '../components/FadeIn';
import Rot13Input from '../components/Rot13Input';



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

const TaskManager = () => {
    const { currentTaskNumber, harMatchetNavn } = useContext(StateContext);

    if (!harMatchetNavn) {
        return (
            <div className="task-container">
                <h1>{ 'Kongelige lekser' }</h1>
                <p>{ 'Det er veldig viktig at navnet matcher det i url\'en.' }</p>
                <Rot13Input />
            </div>
        );
    }


    const taskComponents = [
        <FadeIn fadeInTime={ 1000 }>
            <Task initCode={ tasks[1].initCode } taskName={ tasks[1].taskName } leverSvarTekst={ tasks[1].leverSvarTekst} oppgavetekst={ tasks[1].oppgavetekst } key={ tasks[1].taskName } />
        </FadeIn>,
        <Task initCode={ tasks[2].initCode } taskName={ tasks[2].taskName } leverSvarTekst={ tasks[2].leverSvarTekst} oppgavetekst={ tasks[2].oppgavetekst } key={ tasks[2].taskName } />,
        <Task initCode={ tasks[3].initCode } taskName={ tasks[3].taskName } leverSvarTekst={ tasks[3].leverSvarTekst} oppgavetekst={ tasks[3].oppgavetekst } key={ tasks[3].taskName } />,
        <FadeIn>
            <Task initCode={ tasks[4].initCode } taskName={ tasks[4].taskName } leverSvarTekst={ tasks[4].leverSvarTekst} oppgavetekst={ tasks[4].oppgavetekst } key={ tasks[4].taskName } />
        </FadeIn>
    ];

    return taskComponents[currentTaskNumber - 1];
};

export default TaskManager;
