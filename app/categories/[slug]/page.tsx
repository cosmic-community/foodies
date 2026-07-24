// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getAllCategories } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import { getMetafieldValue } from '@/types'

export async function generateStaticParams() {
  const categories = await getAllCategories()
  return categories.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return { title: 'Category Not Found' }
  return {
    title: `${category.title} — Foodies`,
    description: category.metadata?.description || `Food stories in ${category.title}`,
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) notFound()

  const posts = await getPostsByCategory(category.id)

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Category Hero */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        {category.metadata?.cover_image ? (
          <>
            <img
              src={`${category.metadata.cover_image.imgix_url}?w=1400&h=400&fit=crop&auto=format,compress`}
              alt={category.title}
              className="w-full h-full object-cover"
              width={1400}
              height={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-600 to-orange-700" />
        )}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <span className="text-4xl mb-2 block">🏷️</span>
            <h1 className="text-4xl font-bold text-white">{category.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {category.metadata?.description && (
          <p className="text-lg text-gray-600 mb-10 max-w-3xl">
            {getMetafieldValue(category.metadata.description)}
          </p>
        )}

        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Stories in {category.title}
          <span className="ml-2 text-amber-600 text-lg font-normal">({posts.length})</span>
        </h2>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🍽️</span>
            <p className="text-gray-500 text-lg">No stories in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}