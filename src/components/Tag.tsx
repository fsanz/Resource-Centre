import type { TagProps } from '../types'

export default function Tag({ label }: TagProps) {
  return (
    <span className='rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600'>
      {label}
    </span>
  )
}
