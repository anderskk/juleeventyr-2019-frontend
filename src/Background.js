import React, { useContext } from 'react';
import snowField from './teacher/SnowField.jpg';
import classroom from './teacher/classroom.jpg';
import { StateContext } from './App';

const Background = () => {
    const { erIKlasserommet } = useContext(StateContext);
    const style = {
        backgroundImage: `url(${erIKlasserommet ? classroom : snowField})`,
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: '100%',
        opacity: 0.4,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        zIndex: -1000
    };

    return <div style={ style }></div>
};

export default Background;
