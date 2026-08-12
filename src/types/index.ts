export type ContentCategory =
  | "Podcasts"
  | "Articles"
  | "Newsletters"
  | "Recipes"
  | "Fitness"
  | "Meditation";

export type ContentType = "audio" | "video" | "article";

export type ContentItem = {
  id: string;
  category: ContentCategory;
  type?: ContentType;
  title: string;
  thumbnail: string;
  tags: string[];
  duration: number;
  description: string;
  date_uploaded: string;
};

export type TagProps = {
  label: string;
};

export type ResourceCardProps = {
  resource: ContentItem;
};

export type SortOption = 'newest' | 'oldest' | 'category';

export type ResourceListingsProps = {
  resources: ContentItem[];
  sort: SortOption;
};

export type ResourceCategorySectionProps = {
  category: ContentCategory;
  items: ContentItem[];
};

export type GroupedResources = Partial<Record<ContentCategory, ContentItem[]>>
