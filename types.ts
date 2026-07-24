export interface CosmicImage {
  url: string
  imgix_url: string
}

export interface Author {
  id: string
  slug: string
  title: string
  type: string
  created_at: string
  metadata: {
    bio?: string
    profile_photo?: CosmicImage
    location?: string
    website?: string
  }
}

export interface Category {
  id: string
  slug: string
  title: string
  type: string
  created_at: string
  metadata: {
    description?: string
    cover_image?: CosmicImage
  }
}

export interface Post {
  id: string
  slug: string
  title: string
  type: string
  created_at: string
  metadata: {
    excerpt?: string
    content?: string
    featured_image?: CosmicImage
    author?: Author
    category?: Category
    tags?: string
    published_date?: string
  }
}

// Helper to safely get string from potentially complex metafield
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Type guard for Cosmic 404 errors
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}