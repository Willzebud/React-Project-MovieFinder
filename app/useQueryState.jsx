import { useState, useEffect } from "react";

export const useQueryState = (queryKey, initialValue) => {
  const [queryState, setQueryState] = useState(initialValue);

  useEffect(() => {
    const newURL = new URL(window.location);
    const params = newURL.searchParams;

    if (params.get(queryKey)) {
      setQueryState(params.get(queryKey));
    }
  }, [queryKey, initialValue]);

  useEffect(() => {
    if (queryState === initialValue) return;

    const newURL = new URL(window.location);
    const params = newURL.searchParams;

    if (!queryState) {
      params.delete(queryKey);
    } else {
      params.set(queryKey, queryState);
    }

    window.history.replaceState(null, "", newURL.toString());
  }, [queryKey, queryState, initialValue]);

  return [queryState, setQueryState];
};
