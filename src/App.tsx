import { useState } from "react";
import AppHeader from "./components/AppHeader";
import { data as initialData } from "./services/data";
import ResourceCard from "./components/ResourceCard";
import type { ContentItem } from "./types";
import EmptyResourceList from "./components/EmptyResourceList";

function App() {
  const [resources] = useState<ContentItem[]>(initialData);

  return (
    <div className="min-h-screen bg-[#fbfcfb] text-slate-900">
      <AppHeader />

      <main id="main-content" className="mx-auto max-w-xl px-5 pb-28">
        <section className="mt-8 space-y-8" aria-label="Resource listings">
          {!resources.length ? (
            <EmptyResourceList />
          ) : (
          <div className="space-y-3">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
