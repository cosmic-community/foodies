import { createBucketClient } from '@cosmicjs/sdk'
import { Post, Author, Category, hasStatus } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// ── Posts ──────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'slug', 'title', 'type', 'created_at', 'metadata'])
      .depth(2)
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw error
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .depth(2)
    return response.object as Post
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw error
  }
}

export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts', 'metadata.category': categoryId })
      .props(['id', 'slug', 'title', 'type', 'created_at', 'metadata'])
      .depth(2)
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw error
  }
}

export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts', 'metadata.author': authorId })
      .props(['id', 'slug', 'title', 'type', 'created_at', 'metadata'])
      .depth(2)
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw error
  }
}

// ── Authors ────────────────────────────────────────────────────────────

export async function getAllAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'slug', 'title', 'type', 'created_at', 'metadata'])
      .depth(1)
    return response.objects as Author[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw error
  }
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'authors', slug })
      .depth(1)
    return response.object as Author
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw error
  }
}

// ── Categories ─────────────────────────────────────────────────────────

export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'slug', 'title', 'type', 'created_at', 'metadata'])
      .depth(1)
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw error
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .depth(1)
    return response.object as Category
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw error
  }
}