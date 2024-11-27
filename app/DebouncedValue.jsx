import { useState, useEffect } from "react";

export const useDebouceValue = (value, delay) => {
  const [deboucedValue, setDeboucedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDeboucedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return deboucedValue;
};
