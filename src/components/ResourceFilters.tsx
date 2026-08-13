import type { ResourceFiltersProps, SortOption } from '../types'
import { categoryOrder } from '../utils/resources'

export default function ResourceFilters({
  categoryFilter,
  onCategoryFilterChange,
  sort,
  onSortChange,
}: ResourceFiltersProps) {
  return (
    <section className='mt-3 flex gap-3' aria-label='Filter and sort resources'>
      <label htmlFor='category-filter' className='sr-only'>
        Filter by category
      </label>
      <select
        id='category-filter'
        value={categoryFilter}
        onChange={(event) => onCategoryFilterChange(event.target.value)}
        className='h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-wellbe-500'
      >
        <option value='All'>All Categories</option>
        {categoryOrder.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label htmlFor='sort-order' className='sr-only'>
        Sort resources
      </label>
      <select
        id='sort-order'
        value={sort}
        onChange={(event) => onSortChange(event.target.value as SortOption)}
        className='h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-wellbe-500'
      >
        <option value='newest'>Newest</option>
        <option value='oldest'>Oldest</option>
        <option value='category'>Category</option>
      </select>
    </section>
  )
}
