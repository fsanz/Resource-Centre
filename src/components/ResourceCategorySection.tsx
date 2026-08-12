import type { ResourceCategorySectionProps } from "../types";
import ResourceCard from "./ResourceCard";

export default function ResourceCategorySection({
  category,
  items,
}: ResourceCategorySectionProps) {
  return (
    <section aria-labelledby={`category-${category}`}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3
            id={`category-${category}`}
            className="font-bold text-slate-900"
          >
            {category}
          </h3>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}
