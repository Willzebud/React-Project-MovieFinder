"use client";
import React, { useState, useEffect } from "react";
import useQueryState from "./UseQueryState";
import { useDebouceValue } from "./DebouncedValue";

// import { Search } from "lucide-react";

export default function Home() {
  const [query, setQuery] = useQueryState("search", "");
  const [currentUrl, setCurrentUrl] = useState("");
  const debounceValue = useDebouceValue(query, 500);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("search", query);
    const updateUrl = `${window.location.origin}${
      window.location.pathname
    }?${params.toString()}`;
    setCurrentUrl(updateUrl);
  }, [query]);

  React.useEffect(() => {
    if (debounceValue) {
      console.log(`Recherche pour : ${debounceValue}`);
    }
  }, [debounceValue]);
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
        <p className="p-4">URL : {currentUrl}</p>
      </fieldset>
    </div>
  );
}
