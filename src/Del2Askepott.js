import React, { useState, useMemo, useEffect } from 'react';
import cookie from './cookie.png';
import star from './star.svg';
import askepott from './askepott.png';
import Axios from 'axios';
import { baseUrl, getUrlParameter } from './App';
import FadeIn from './components/FadeIn';


const Del2Askepott = () => {

    const [hasClicked, setHasClicked] = useState(false);
    const [ferdigMedLekser, setFerdigMedLekser] = useState(false);
    // const dispatch = useContext(DispatchContext);
    // const { ferdigMedLekser } = useContext(StateContext);
    useEffect(() => {
        async function sjekkLeksestatus() {
            try {
                await Axios.get(`${baseUrl}/api/askepott?user=${getUrlParameter('username')}`);
                setFerdigMedLekser(true);
            } catch (e) {
                console.log(e.response.data);
            }
        }
        sjekkLeksestatus();
    }, [])
    const stars = useMemo(() => {
        const myRand = () => {
            let r = 50
            while (40 < r && r < 60) {
                r = Math.random() * 100
            }
            return r
        }
        let allStars = [];
        for (let i = 0; i < 30; i++) {
            const delay = Math.random() + 's';
            allStars.push(
                <img
                    key={ `stjerne-nr-${i+1}` }
                    alt="alt-text"
                    src={ star }
                    className="glitter-star"
                    style={
                        {
                            top: myRand() + '%',
                            left: myRand() + '%',
                            animationDelay: delay,
                            msAnimationDelay: delay,
                            WebkitAnimationDelay: delay,
                            monAnimationDelay: delay
                        }
                    }
                    />
            )
        }
        return allStars;
    }, []);

    if(!ferdigMedLekser) {
        return null;
    }

    if (hasClicked) {
        return (
            <div className="akepott-image">
                <FadeIn fadeInTime={ 500 }>
                    { stars }
                    <img src={ askepott } alt="alt-text" />
                </FadeIn>
            </div>
        );
    }

    const clickCookie = async () => {
        setHasClicked(true);
        try {
            await Axios.get(`${baseUrl}/api/jaktutstyr?user=${getUrlParameter('username')}`);
            console.log("%cHusk å url decode verdien...", "background: red; color: yellow; font-size: x-large");
        } catch (e) {
            console.log(e.response);
        }
    };

    return (
        <button 
            onClick={ clickCookie }
            id="cookie" className="button-image">
            { stars }
            <img src={ cookie } alt="alt-text" />
        </button>
    );
};

export default Del2Askepott;
