import React from 'react';
import MainContent from './container/MainContent';
import TeacherAside from './teacher/TeacherAside';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Del1Lekser = () => (
    <div className="lekser-container">
        <Row>
            <Col md={3} lg={3} sm={3}>
                <TeacherAside />
            </Col>
            <Col md={9} lg={9} sm={9}>
                <MainContent />
            </Col>
        </Row>
    </div>
);

export default Del1Lekser;
