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
        <h1 className="text-4xl font-bold text-center">Movie Finder</h1>
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
        <div className="grid grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="w-full h-full object-cover rounded-md shadow aspect-[2/3] skeleton" />
                  <div>
                    <p className="text-sm font-medium h-5 w-1/2 skeleton"></p>
                    <p className="text-xs mt-0.5 text-neutral-content font-medium h-4 w-1/3 skeleton"></p>
                  </div>
                </div>
              ))
            : null}
          {data?.Search?.length > 0
            ? data.Search.map((movie) => (
                <div key={movie.imdbID} className="flex flex-col gap-4">
                  <img
                    src={movie.Poster}
                    alt={`${movie.Title}'s poster`}
                    className="w-full h-full object-cover rounded-md shadow aspect-[2/3]"
                  />
                  <div>
                    <p className="text-sm font-medium">{movie.Title}</p>
                    <p className="text-xs text-neutral-content font-medium">
                      {movie.Year} | {movie.Type}
                    </p>
                  </div>
                </div>
              ))
            : null}
        </div>
      </main>
    </div>
  );
}
