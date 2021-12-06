import { useState, useEffect } from "react";

const useCounterHook = (initialCount = 0, value) => {
  const [count, setCount] = useState(initialCount);
  const increment = () => {
    setCount((prevCount) => prevCount + value);
  };
  const degrement = () => {
    setCount((prevCount) => prevCount - value);
  };

  const reset = () => {
    setCount(initialCount);
  };

  return [count, increment, degrement, reset];
};

export default useCounterHook;
