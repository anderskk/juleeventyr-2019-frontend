import React, { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { StateContext, DispatchContext } from '../App';
import { gjoerLekser } from '../actions/actions';
import Klasserom from '../Klasserom';
import FadeIn from '../components/FadeIn';

const MainContent = () => {

    const { erIKlasserommet } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);
    const trykkGjoerLekser = () => dispatch(gjoerLekser());

    if (erIKlasserommet) {
        return <Klasserom />;
    }

    return (
        <FadeIn>
            <Row className="center-content">
                <Col>
                    <Button 
                        onClick={ () => {window.location.href = 'https://www.njff.no/'} }
                        variant="danger">
                        { 'Stikk av og dra på jakt istedet!' }
                    </Button>
                </Col>
                <Col>
                    <Button 
                        onClick={ trykkGjoerLekser }
                        variant="success">
                        { 'Gjør lekser' }
                    </Button>
                </Col>
            </Row>
        </FadeIn>
    );
};

export default MainContent;
