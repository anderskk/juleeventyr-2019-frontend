import React, { createContext, useReducer } from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import reducer from './reducer/reducer';
import TeacherAside from './teacher/TeacherAside';
import Background from './Background'
import MainContent from './container/MainContent';


export const StateContext = createContext();
export const DispatchContext = createContext();

const getUrlParameter = (name) => {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(window.location.search);
  return results && decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const initState = {
  teacherQuote: 'Deres høyhet! Deres høyyyheeeeet! Hva med leksene, deres høyhet? Leksene!'
};

function App() {
  const user = getUrlParameter('username');
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <StateContext.Provider value={ state }>
      <DispatchContext.Provider value={ dispatch }>
        { !user && 
          <Alert variant="danger">
            { 'Ingen bruker er satt! Skriv inn ditt brukernavn i url for å registrere svarene: /?username=<username>' }
          </Alert>
        }
        <Background />
        <Container>
            <Row>
              <Col md={3} lg={3} sm={3}>
                <TeacherAside />
              </Col>
              <Col md={9} lg={9} sm={9}>
                <MainContent />
              </Col>
            </Row>
          </Container>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
