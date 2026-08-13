import type { ContentCategory, ContentItem } from './content'

export type SortOption = 'newest' | 'oldest' | 'category'

export type GroupedResources = Partial<Record<ContentCategory, ContentItem[]>>
