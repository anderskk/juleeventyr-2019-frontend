import React, { useContext } from 'react';
import teacherImg from './teacher.png';
import classroomTeacher from './classroomTeacher.png';
import { StateContext } from '../App';


const TeacherAside = () => {
    const { erIKlasserommet, teacherQuote } = useContext(StateContext);
    const styling = {
        backgroundImage: `url(${erIKlasserommet ? classroomTeacher : teacherImg})`,
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        height: '50%'
    };
    return (
        <div style={ { height: window.innerHeight, padding: '1em' } }>
            <p style={ { position: 'relative', top: '20%', fontSize: 'x-large' } }>
                { teacherQuote }
            </p>
            <div style={ styling } />
        </div>
    );
};

export default TeacherAside;
