import React, { useState } from 'react';

const FadeIn = ({ fadeInTime = 3000, children }) => {
    const [show, setShow] = useState(false);

    setTimeout(() => {
        setShow(true);
    }, fadeInTime);

    if (!show) {
        return null;
    }

    return (
        <div className="fade-in">{ children }</div>
    );
};

export default FadeIn;
