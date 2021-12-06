import React from 'react';


const Child = ({count,increment}) => {
 
    return (<div>
        counter { count}
        <button onClick={()=>increment()}>increment</button>
    </div>
    )
}

export default Child