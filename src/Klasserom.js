import React, { useContext } from 'react';
import { StateContext, DispatchContext } from './App';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { startLekser } from './actions/actions';
import Task from './tasks/Task';
import FadeIn from './components/FadeIn';
import TaskManager from './tasks/TaskManager';


const Klasserom = () => {
    const { currentTaskNumber } = useContext(StateContext);
    const dispatch = useContext(DispatchContext);

    if (Number.isInteger(currentTaskNumber)) {
        return <TaskManager />;
    }
    const gjorLekser = () => dispatch(startLekser);

    return (
        <FadeIn>
            <Row className="center-content">
                <Button onClick={ gjorLekser }>
                    { 'Sett i gang...' }
                </Button>
            </Row>
        </FadeIn>
    );
};

export default Klasserom;
