import React, {useState,useEffect} from 'react';

const Progress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            if (progress<100) { 
                setProgress((prevProp) => prevProp + 1);
            }
        }, 100)
    }, [progress])
    
    console.log(progress);

    return (
        <div>
            <h4>progress Bar</h4>
            <progress value={progress} max={100}></progress>
        </div>
    )
}

export default Progress;