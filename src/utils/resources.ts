import type { ContentCategory, ContentItem, SortOption } from "../types";
import { data } from "../services/data";

export const categoryOrder: ContentCategory[] = [
  ...new Set(data.map((item) => item.category)),
];

export function filterAndSortResources(
  resources: ContentItem[],
  category: string,
  sort: SortOption,
  search: string,
) {
  const query = search.trim().toLowerCase();

  let filtered = resources.filter((resource) => {
    const matchesCategory =
      category === "All" || resource.category === category;
    const searchableText = [resource.title, ...resource.tags]
      .join(" ")
      .toLowerCase();
    const matchesSearch = !query || searchableText.includes(query);

    return matchesCategory && matchesSearch;
  });

  if (sort === "newest") {
    filtered = [...filtered].sort(
      (a, b) =>
        parseUploadDate(b.date_uploaded) - parseUploadDate(a.date_uploaded),
    );
  }

  if (sort === "oldest") {
    filtered = [...filtered].sort(
      (a, b) =>
        parseUploadDate(a.date_uploaded) - parseUploadDate(b.date_uploaded),
    );
  }

  if (sort === "category") {
    filtered = [...filtered].sort(
      (a, b) =>
        categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category),
    );
  }

  return filtered;
}

function parseUploadDate(date: string) {
  return new Date(`${date}T00:00:00`).getTime();
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
