import type { ContentCategory, ContentItem, SortOption } from "../types";
import { data } from "../services/data";

export const categoryOrder: ContentCategory[] = [
  ...new Set(data.map((item) => item.category)),
];

export function filterAndSortResources(
  resources: ContentItem[],
  category: string,
  sort: SortOption,
) {
  let filtered = resources.filter((resource) => {
    const matchesCategory =
      category === "All" || resource.category === category;

    return matchesCategory;
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
