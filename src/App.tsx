import { useState } from "react";
import AppHeader from "./components/AppHeader";
import { data as initialData } from "./services/data";
import type { ContentItem, SortOption } from "./types";
import ResourceListings from "./components/ResourceListings";

function App() {
  const [resources] = useState<ContentItem[]>(initialData);
  const [sort, setSort] = useState<SortOption>('category');

  return (
    <div className="min-h-screen bg-[#fbfcfb] text-slate-900">
      <AppHeader />

      <main id="main-content" className="mx-auto max-w-xl px-5 pb-28">
        <ResourceListings resources={resources} sort={sort} />
      </main>
    </div>
  );
}

export default App;
