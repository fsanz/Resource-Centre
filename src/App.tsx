import { useState } from "react";
import AppHeader from "./components/AppHeader";
import { data as initialData } from "./services/data";
import type { ContentItem, SortOption } from "./types";
import ResourceListings from "./components/ResourceListings";
import ResourceFilters from "./components/ResourceFilters";
import ResourceSearch from "./components/ResourceSearch";

function App() {
  const [resources] = useState<ContentItem[]>(initialData);
  const [sort, setSort] = useState<SortOption>("category");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-[#fbfcfb] text-slate-900">
      <AppHeader />

      <main id="main-content" className="mx-auto max-w-xl px-5 pb-28">
        <ResourceSearch
          search={search}
          onSearchChange={setSearch}
          resultsStatusId="search-results-status"
        />

        <ResourceFilters
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          sort={sort}
          onSortChange={setSort}
        />

        <ResourceListings
          resources={resources}
          sort={sort}
          categoryFilter={categoryFilter}
          search={search}
        />
      </main>
    </div>
  );
}

export default App;
