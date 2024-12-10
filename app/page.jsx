"use client";
import { useQueryState } from "./UseQueryState";
import { useDebouceValue } from "./DebouncedValue";
import { useApiKeyRequired } from "./useApiKeyRequired";
import { useMovieQuery } from "./useMovieQuery";
// import { Search } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useQueryState("s", "");
  const debounceQuery = useDebouceValue(query, 500);
  useApiKeyRequired();
  const { data, error, isLoading } = useMovieQuery(debounceQuery);

  return (
    <div className="min-h-full flex flex-col gap-4 py-8 max-w-4xl m-auto px-4">
      <header>
        <h1 className="text-4xl font-bold text-center">MovieFinder</h1>
      </header>
      <fieldset className="border p-4 w-full rounded-lg border-neutral">
        <legend>Search</legend>
        <div>
          <input
            type="text"
            value={query}
            placeholder="Search..."
            className="input input-bordered w-full"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <p className="p-4">URL : {debounceQuery}</p>
      </fieldset>
      <main>
        {error ? <p>Error : {error.message}</p> : null}
        <div className="grid w-full grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {isLoading ? <p>...</p> : null}
          {data?.Search?.length > 0
            ? data.Search.map((movie) => (
                <div key={movie.imdbID}>{movie.Title}</div>
              ))
            : null}
        </div>
      </main>
    </div>
  );
}
