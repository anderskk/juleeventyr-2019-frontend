import React, { createContext, useReducer } from 'react';
import Alert from 'react-bootstrap/Alert';
import './App.css';
import reducer from './reducer/reducer';
import Background from './Background'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Del1Lekser from './Del1Lekser';
import Del2Askepott from './Del2Askepott';


// export const baseUrl = 'http://localhost:5000';
export const baseUrl = 'https://jul19kongeligelekser-backend.herokuapp.com';

export const StateContext = createContext();
export const DispatchContext = createContext();

export const getUrlParameter = (name) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(window.location.search);
  return results && decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const initState = {
  teacherQuote: 'Deres høyhet! Deres høyyyheeeeet! Off.. Men hva med leksene, nu da? Leksene!'
};

function App() {
  const user = getUrlParameter('username');
  const [state, dispatch] = useReducer(reducer, initState);

  if (!user) {
    return (
      <Alert variant="danger">
        { 'Ingen bruker er satt! Skriv inn ditt brukernavn i url for å registrere svarene: /?username=<username>' }
      </Alert>
    );
  }

  return (
    <StateContext.Provider value={ state }>
      <DispatchContext.Provider value={ dispatch }>
        <Background />
        <Router>
          <Switch>
            <Route exact path="/">
              <Del1Lekser />
            </Route>
            <Route path ="/askepott">
              <Del2Askepott />
            </Route>
          </Switch>
        </Router>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
