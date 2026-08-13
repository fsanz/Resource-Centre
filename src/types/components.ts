import type { ContentCategory, ContentItem } from './content'
import type { SortOption } from './utils'

export type TagProps = {
  label: string
}

export type ResourceCardProps = {
  resource: ContentItem
  onOpen: (resource: ContentItem) => void
}

export type ResourceListingsProps = {
  resources: ContentItem[]
  sort: SortOption
  categoryFilter: string
  search: string
  onOpen: (resource: ContentItem) => void
}

export type ResourceCategorySectionProps = {
  category: ContentCategory
  items: ContentItem[]
  onOpen: (resource: ContentItem) => void
}

export type ResourceFiltersProps = {
  categoryFilter: string
  onCategoryFilterChange: (category: string) => void
  sort: SortOption
  onSortChange: (sort: SortOption) => void
}

export type ResourceSearchProps = {
  search: string
  onSearchChange: (search: string) => void
  resultsStatusId: string
}

export type ResourceModalProps = {
  resource: ContentItem | null
  onClose: (resource: ContentItem | null) => void
}
