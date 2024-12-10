import { useEffect } from "react";

export const useApiKeyRequired = () => {
  useEffect(() => {
    const localStorageApiKey = localStorage.getItem("omdbApiKey");

    if (!localStorageApiKey) {
      while (!localStorage.getItem("omdbApiKey")) {
        const apiKey = prompt("Quel est ton OMB API Key ?");
        if (apiKey) {
          localStorage.setItem("omdbApiKey", apiKey);
        }
      }
    }
  }, []);
};
