import useSWR from "swr";

export const useMovieQuery = (search) => {
  return useSWR(`movie-query-${search}`, async () => {
    if (search.length < 3) {
      throw new Error("STP écris au moins 3 charactères");
    }
    const apiKey = localStorage.getItem("omdbApiKey");

    if (!apiKey) {
      throw new Error("Invalide API Key");
    }
    const url = new URL("http://www.omdbapi.com");
    url.searchParams.set("s", search);
    url.searchParams.set("apiKey", apiKey);

    const json = await fetch(url.toString()).then((res) => res.json());
    console.log("Response JSON:", json);
    return json;
  });
};
