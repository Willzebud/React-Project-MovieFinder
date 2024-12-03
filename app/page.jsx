"use client";
import { useQueryState } from "./UseQueryState";
import { useDebouceValue } from "./DebouncedValue";

// import { Search } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useQueryState("s", "");
  const debounceQuery = useDebouceValue(query, 500);

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
    </div>
  );
}
