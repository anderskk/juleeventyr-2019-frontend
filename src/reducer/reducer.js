import * as Actions from "../actions/actions";


const qoutes = {
    correctAnswer_1: 'Korrekt, Deres høyhet! Jeg visste De ville klare det!',
    correctAnswer_2: 'Helt riktig! Bra jobbet, Deres høyhet!',
    wrongAnswer_1: 'Det var dessverre ikke helt korrekt, Deres høyhet. Prøv en gang til, er De snill.',
    wrongAnswer_2: 'Fortsatt feil, Deres høyhet. Men nu tror jeg at neste gang får De det tiiiiil!',
}

export default function(state = {}, action) {
    switch (action.type) {

        case Actions.GJOER_LEKSER: {
            return {
                ...state,
                erIKlasserommet: true,
                teacherQuote: 'Lekser er gøy, jeg er glad De er enig, Deres høyhet. Det er bare å sette i gang når De er klaaaar.'
            };
        }
        case Actions.START_LEKSER: {
            return {
                ...state,
                currentTaskNumber: 1,
                teacherQuote: 'Skriv inn ditt (gruppe)navn, er De snill. De kan begynne på leksene etter De har gjort det.'
            }
        }
        case Actions.HAR_MATCHET_NAVN: {
            return {
                ...state,
                harMatchetNavn: true,
                teacherQuote: 'Bra jobbet! Her er første oppgave. Det er bare å spørre om hjelp hvis De trenger det.'
            };
        }
        case Actions.TASK_COMPLETE: {
            if (state.currentTaskNumber === 4) {
                return {
                    ...state,
                    currentTaskNumber: state.currentTaskNumber + 1,
                    teacherQuote: 'Beklager, Deres høyhet. Det var visst én oppgave til her. Dumme meeeeeg.'
                };
            }
            return {
                ...state,
                currentTaskNumber: state.currentTaskNumber + 1,
                teacherQuote: state.teacherQuote === qoutes.correctAnswer_1 ? qoutes.correctAnswer_2 : qoutes.correctAnswer_1
            };
        }
        case Actions.TASK_FAIL: {
            return {
                ...state,
                teacherQuote: state.teacherQuote === qoutes.wrongAnswer_1 ? qoutes.wrongAnswer_2 : qoutes.wrongAnswer_1
            };
        }
        case Actions.LAST_TASK_405: {
            return {
                ...state,
                teacherQuote: 'Hmm, hva er nu dette? Beklager, Deres høyhet, men jeg muligens begått en feil.. Samtidig er jeg overbevist om at De finner en måte å løse det på.'
            };
        }
        default: {
            return state;
        }
    }
}