"use client";
import { Search } from "lucide-react";
import { search } from "lucide-react";

export default function Home() {
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
            placeholder="Search"
            className="input input-bordered w-full"
          />
        </div>
      </fieldset>
    </div>
  );
}
