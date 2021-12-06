import React, {useState,useEffect} from 'react';

const HookTimer = () => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        const intervel = setInterval(() => {
            setTimer(prevTimer=>prevTimer+1)
        },1000);
        return () => {
            clearInterval(intervel);
        }
    }, [])
    
    console.log("time lazy");
    return (
        <div>
            timer -{ timer}
        </div>
    )
}

export default HookTimer