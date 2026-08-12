import { useMemo } from "react";
import type {
  ResourceListingsProps,
  ContentCategory,
  ContentItem,
  GroupedResources,
} from "../types";
import ResourceCard from "./ResourceCard";
import EmptyResourceList from "./EmptyResourceList";
import ResourceCategorySection from "./ResourceCategorySection";

export default function ResourceListings({
  resources,
  sort,
}: ResourceListingsProps) {
  const isGroupedView = sort === "category";

  const categoryOrder: ContentCategory[] = [
    'Podcasts',
    'Articles',
    'Newsletters',
    'Recipes',
    'Fitness',
    'Meditation',
  ];

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

  const groupedResources = useMemo(
    () => groupByCategory(resources),
    [resources],
  );

  const visibleCategories = categoryOrder.filter(
    (cat) => groupedResources[cat]?.length,
  );

  return (
    <section className="mt-8 space-y-8" aria-label="Resource listings">
      {!resources.length ? (
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
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}
    </section>
  );
}
