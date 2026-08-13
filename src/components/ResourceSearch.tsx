import type { ResourceSearchProps } from "../types";

export default function ResourceSearch({
  search,
  onSearchChange,
  resultsStatusId,
}: ResourceSearchProps) {
  return (
    <section className="mt-6" aria-label="Search resources">
      <label htmlFor="resource-search" className="sr-only">
        Search resources
      </label>
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>

        <input
          id="resource-search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by title or tags..."
          aria-describedby={resultsStatusId}
          className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-wellbe-500 focus:ring-4 focus:ring-wellbe-100"
        />
      </div>
    </section>
  );
}
