import React,{useState,useMemo,Suspense,lazy} from 'react';
import Child from './Child';
// import Child1 from './Child1';
// import HookTimer from './HookTimer';
const Child1 = lazy(() => import('./Child1'));
const HookTimer= lazy(()=>import('./HookTimer'))


const Parent = () => {
    const [counterOne, setCounterOne] = useState(0);
     const [counterTwo, setCounterTwo] = useState(0);

    const incrementOne = () => {
        setCounterOne(counterOne+1)
    }
    const incrementTwo = () => {
        setCounterTwo(counterTwo+1);
    }


    const isEven = useMemo(() => {
        let i = 0;
        while (i < 200000000) i++
        return counterOne % 2 === 0;
    },[counterOne])

    return (
        <div>
         
            <button onClick={incrementOne}>counter One {counterOne}</button>
            <span>{isEven ? "Even":"Odd" }</span>
            <button onClick={incrementTwo}>counter Two { counterTwo}</button>
            {/* <Child count={count} increment={() => increment()} /> */}
             <Suspense fallback={<div>Loading...</div>}>
            <Child1 />
            </Suspense>
            <HookTimer />
        </div>
    )
}

export default Parent;
