import { useCallback, useEffect, useId, useRef } from 'react'
import type { ResourceModalProps } from '../types'
import { formatDate } from '../utils/resources'
import Tag from './Tag'

export default function ResourceModal({
  resource,
  onClose,
}: ResourceModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const closeModal = useCallback(() => onClose(null), [])

  useEffect(() => {
    if (!resource) return

    previousFocusRef.current = document.activeElement as HTMLElement
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
        return
      }

      if (event.key !== 'Tab' || !containerRef.current) return

      const focusable = containerRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      const elements = Array.from(focusable)
      if (!elements.length) return

      const first = elements[0]!
      const last = elements[elements.length - 1]!

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.body.classList.add('overflow-hidden')
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.classList.remove('overflow-hidden')
      document.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [resource, onClose])

  if (!resource) return null

  const tags = resource.tags.slice(0, 3)
  const aboutText = `${resource.title} is a carefully selected ${resource.category.toLowerCase()} resource designed to support your wellbeing. Explore this resource at your own pace and make it part of your personal wellbeing routine.`

  return (
    <div ref={containerRef} className='fixed inset-0 z-50'>
      <button
        type='button'
        aria-label='Close resource details'
        className='backdrop-enter absolute inset-0 bg-slate-950/40 backdrop-blur-sm'
        onClick={closeModal}
      />

      <div
        role='dialog'
        aria-modal='true'
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className='modal-enter absolute inset-x-0 bottom-0 max-h-[94vh] overflow-hidden rounded-t-[28px] bg-white shadow-2xl'
      >
        <div className='flex justify-center py-3' aria-hidden='true'>
          <div className='h-1.5 w-12 rounded-full bg-slate-200' />
        </div>

        <div className='max-h-[calc(94vh-20px)] overflow-y-auto'>
          <div className='relative px-4'>
            <img
              src={resource.thumbnail}
              alt=''
              aria-hidden='true'
              className='h-56 w-full rounded-2xl object-cover'
            />

            <button
              ref={closeButtonRef}
              type='button'
              aria-label='Close resource details'
              className='absolute right-7 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm backdrop-blur'
              onClick={closeModal}
            >
              <svg
                className='h-5 w-5'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.8'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path d='m6 6 12 12M18 6 6 18' />
              </svg>
            </button>
          </div>

          <div className='px-5 pb-10 pt-5'>
            <div className='flex items-center justify-between'>
              <span className='rounded-full bg-wellbe-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-wellbe-700'>
                {resource.category}
              </span>
            </div>

            <h2
              id={titleId}
              className='mt-3 text-2xl font-bold tracking-tight text-slate-900'
            >
              {resource.title}
            </h2>

            <div className='mt-4 flex flex-wrap gap-2' aria-label='Tags'>
              {tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>

            <div className='mt-5 flex items-center gap-5 text-sm text-slate-500'>
              <div className='flex items-center gap-2'>
                <svg
                  className='h-5 w-5'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.7'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <circle cx='12' cy='12' r='8' />
                  <path d='M12 8v4l2.5 2' />
                </svg>
                <span>{resource.duration} min</span>
              </div>

              <div className='flex items-center gap-2'>
                <svg
                  className='h-5 w-5'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.7'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
                >
                  <rect x='4' y='5' width='16' height='15' rx='2' />
                  <path d='M8 3v4M16 3v4M4 10h16' />
                </svg>
                <span>{formatDate(resource.date_uploaded)}</span>
              </div>
            </div>

            <div
              className='my-6 border-t border-slate-100'
              aria-hidden='true'
            />

            <h3 className='text-base font-semibold text-slate-900'>
              Description
            </h3>
            <p
              id={descriptionId}
              className='mt-3 text-sm leading-7 text-slate-600'
            >
              {resource.description}
            </p>

            <div
              className='my-6 border-t border-slate-100'
              aria-hidden='true'
            />

            <h3 className='text-base font-semibold text-slate-900'>
              About this resource
            </h3>
            <p className='mt-3 text-sm leading-7 text-slate-600'>{aboutText}</p>

            <div
              className='my-6 border-t border-slate-100'
              aria-hidden='true'
            />

            <h3 className='text-base font-semibold text-slate-900'>Tags</h3>
            <div className='mt-3 flex flex-wrap gap-2' aria-label='All tags'>
              {tags.map((tag) => (
                <Tag key={tag} label={tag} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
