import { useMemo } from "react";
import type {
  ResourceListingsProps,
  ContentItem,
  GroupedResources,
} from "../types";
import ResourceCard from "./ResourceCard";
import EmptyResourceList from "./EmptyResourceList";
import ResourceCategorySection from "./ResourceCategorySection";
import { categoryOrder, filterAndSortResources } from "../utils/resources";

export default function ResourceListings({
  resources,
  sort,
  categoryFilter,
  search,
}: ResourceListingsProps) {
  const isGroupedView = sort === "category";

  const groupByCategory = (resources: ContentItem[]): GroupedResources => {
    const grouped: GroupedResources = {};

    for (const resource of resources) {
      if (!grouped[resource.category]) {
        grouped[resource.category] = [];
      }
      grouped[resource.category]!.push(resource);
    }

    return grouped;
  };

  const filteredResources = useMemo(
    () => filterAndSortResources(resources, categoryFilter, sort, search),
    [resources, categoryFilter, sort, search],
  );

  const groupedResources = useMemo(
    () => groupByCategory(filteredResources),
    [filteredResources],
  )

  const visibleCategories =
    categoryFilter === "All"
      ? categoryOrder.filter((cat) => groupedResources[cat]?.length)
      : categoryOrder.filter(
          (cat) => cat === categoryFilter && groupedResources[cat]?.length,
        );

  return (
    <section className="mt-8 space-y-8" aria-label="Resource listings">
      {!filteredResources.length ? (
        <EmptyResourceList />
      ) : isGroupedView ? (
        visibleCategories.map((category) => (
          <ResourceCategorySection
            key={category}
            category={category}
            items={groupedResources[category]!}
          />
        ))
      ) : (
        <div className="space-y-3">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </section>
  );
}
