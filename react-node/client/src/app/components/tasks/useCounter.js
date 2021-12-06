import React, { useEffect } from "react";
import useCounterHook from "./useCounterHook";

function UseCounter() {
  const [count, increment, degrement, reset] = useCounterHook(10, 10);

  return (
    <div>
      count-{count}
      <button onClick={increment}>Increment</button>
      <button onClick={degrement}>Degrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default UseCounter;
