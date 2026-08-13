import { useState } from 'react'
import AppHeader from './components/AppHeader'
import ResourceFilters from './components/ResourceFilters'
import ResourceListings from './components/ResourceListings'
import ResourceModal from './components/ResourceModal'
import ResourceSearch from './components/ResourceSearch'
import { data as initialData } from './services/data'
import type { ContentItem, SortOption } from './types'

function App() {
  const [resources] = useState<ContentItem[]>(initialData)
  const [sort, setSort] = useState<SortOption>('category')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [activeResource, setActiveResource] = useState<ContentItem | null>(null)

  return (
    <div className='min-h-screen bg-[#fbfcfb] text-slate-900'>
      <AppHeader />

      <main id='main-content' className='mx-auto max-w-xl px-5 pb-28'>
        <ResourceSearch
          search={search}
          onSearchChange={setSearch}
          resultsStatusId='search-results-status'
        />

        <ResourceFilters
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          sort={sort}
          onSortChange={setSort}
        />

        <ResourceListings
          resources={resources}
          sort={sort}
          categoryFilter={categoryFilter}
          search={search}
          onOpen={setActiveResource}
        />

        <ResourceModal resource={activeResource} onClose={setActiveResource} />
      </main>
    </div>
  )
}

export default App
