import React, {useEffect,useRef } from 'react';


const Child1 = () => {
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    console.log("lazy component");

    return (
        <div>
            use ref function
            <input ref={inputRef} type="text" />
           
        </div>
    )
}
export default Child1