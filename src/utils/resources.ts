import { data } from '../services/data'
import type { ContentCategory } from '../types'

export const categoryOrder: ContentCategory[] = [
  ...new Set(data.map((item) => item.category)),
]

export function parseUploadDate(date: string) {
  return new Date(`${date}T00:00:00`).getTime()
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
