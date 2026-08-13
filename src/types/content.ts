export type ContentCategory =
  | 'Podcasts'
  | 'Articles'
  | 'Newsletters'
  | 'Recipes'
  | 'Fitness'
  | 'Meditation'

export type ContentType = 'audio' | 'video' | 'article'

export type ContentItem = {
  id: string
  category: ContentCategory
  type?: ContentType
  title: string
  thumbnail: string
  tags: string[]
  duration: number
  description: string
  date_uploaded: string
}
