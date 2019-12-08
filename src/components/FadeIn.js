import React, { useState } from 'react';

const FadeIn = ({ children }) => {
    const [show, setShow] = useState(false);

    setTimeout(() => {
        setShow(true);
    }, 500);

    if (!show) {
        return null;
    }

    return (
        <div className="fade-in">{ children }</div>
    );
};

export default FadeIn;
