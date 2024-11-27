import { useState, useEffect } from "react";

export default function useQueryState(key, initialValue) {
  const [state, setState] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get(key) || initialValue;
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (state === initialValue) {
      params.delete(key);
    } else {
      params.set(key, state);
    }
    window.history.replaceState({}, "", `?${params.toString()}`);
  }, [key, state, initialValue]);

  return [state, setState];
}
