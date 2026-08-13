import type { ContentCategory, ResourceCardProps } from '../types'
import Tag from './Tag'

export default function ResourceCard({ resource, onOpen }: ResourceCardProps) {
  const label = `${resource.title}, ${resource.category}, ${resource.duration} minutes`

  function openResource() {
    onOpen(resource)
  }

  function hasPlayOverlay(category: ContentCategory) {
    return (
      category === 'Podcasts' ||
      category === 'Fitness' ||
      category === 'Meditation'
    )
  }

  return (
    <button
      type='button'
      aria-label={label}
      className='group flex w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:scale-[0.995]'
      onClick={openResource}
    >
      <div className='relative w-[38%] shrink-0'>
        <img
          src={resource.thumbnail}
          alt={resource.title}
          className='h-full min-h-[150px] w-full object-cover transition duration-300 group-hover:scale-105'
          loading='lazy'
        />

        {hasPlayOverlay(resource.category) && (
          <div
            className='absolute inset-0 flex items-center justify-center'
            aria-hidden='true'
          >
            <span className='flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-wellbe-700 shadow'>
              <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M8 5v14l11-7L8 5Z' />
              </svg>
            </span>
          </div>
        )}
      </div>

      <div className='flex min-w-0 flex-1 flex-col justify-between p-4'>
        <div>
          <h4 className='line-clamp-2 text-sm font-bold leading-5 text-slate-900'>
            {resource.title}
          </h4>

          <div className='mt-3 flex flex-wrap gap-1.5'>
            {resource.tags.slice(0, 3).map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </div>

        <div className='mt-4 flex items-center justify-between gap-2 text-[11px] text-slate-500'>
          <span className='flex items-center gap-1 whitespace-nowrap'>
            <svg
              className='h-3.5 w-3.5'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.7'
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <circle cx='12' cy='12' r='8' />
              <path d='M12 8v4l2.5 2' />
            </svg>
            {resource.duration} min
          </span>
        </div>
      </div>
    </button>
  )
}
