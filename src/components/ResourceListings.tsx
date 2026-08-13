import { useMemo } from 'react'
import type {
  ContentItem,
  GroupedResources,
  ResourceListingsProps,
  SortOption,
} from '../types'
import { categoryOrder, parseUploadDate } from '../utils/resources'
import EmptyResourceList from './EmptyResourceList'
import ResourceCard from './ResourceCard'
import ResourceCategorySection from './ResourceCategorySection'

export const filterAndSortResources = (
  resources: ContentItem[],
  category: string,
  sort: SortOption,
  search: string,
) => {
  const query = search.trim().toLowerCase()

  let filtered = resources.filter((resource) => {
    const matchesCategory = category === 'All' || resource.category === category
    const searchableText = [resource.title, ...resource.tags]
      .join(' ')
      .toLowerCase()
    const matchesSearch = !query || searchableText.includes(query)

    return matchesCategory && matchesSearch
  })

  if (sort === 'newest') {
    filtered = [...filtered].sort(
      (a, b) =>
        parseUploadDate(b.date_uploaded) - parseUploadDate(a.date_uploaded),
    )
  }

  if (sort === 'oldest') {
    filtered = [...filtered].sort(
      (a, b) =>
        parseUploadDate(a.date_uploaded) - parseUploadDate(b.date_uploaded),
    )
  }

  if (sort === 'category') {
    filtered = [...filtered].sort(
      (a, b) =>
        categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category),
    )
  }

  return filtered
}

export default function ResourceListings({
  resources,
  sort,
  categoryFilter,
  search,
  onOpen,
}: ResourceListingsProps) {
  const isGroupedView = sort === 'category'

  const groupByCategory = (resources: ContentItem[]): GroupedResources => {
    const grouped: GroupedResources = {}

    for (const resource of resources) {
      if (!grouped[resource.category]) {
        grouped[resource.category] = []
      }
      grouped[resource.category]!.push(resource)
    }

    return grouped
  }

  const filteredResources = useMemo(
    () => filterAndSortResources(resources, categoryFilter, sort, search),
    [resources, categoryFilter, sort, search],
  )

  const groupedResources = useMemo(
    () => groupByCategory(filteredResources),
    [filteredResources],
  )

  const visibleCategories =
    categoryFilter === 'All'
      ? categoryOrder.filter((cat) => groupedResources[cat]?.length)
      : categoryOrder.filter(
          (cat) => cat === categoryFilter && groupedResources[cat]?.length,
        )

  return (
    <section className='mt-8 space-y-8' aria-label='Resource listings'>
      {!filteredResources.length ? (
        <EmptyResourceList />
      ) : isGroupedView ? (
        visibleCategories.map((category) => (
          <ResourceCategorySection
            key={category}
            category={category}
            items={groupedResources[category]!}
            onOpen={onOpen}
          />
        ))
      ) : (
        <div className='space-y-3'>
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onOpen={onOpen}
            />
          ))}
        </div>
      )}
    </section>
  )
}
