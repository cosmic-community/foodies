import { getAllPosts, getAllCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export const metadata = {
  title: 'All Posts — Foodies',
  description: 'Browse all food travel stories, recipes, and culinary adventures.',
}

export default async function PostsPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ])

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-amber-700 to-orange-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-4 block">📝</span>
          <h1 className="text-4xl font-bold mb-3">All Stories</h1>
          <p className="text-amber-200 text-lg max-w-2xl mx-auto">
            From street food adventures to fine dining explorations — every meal tells a story.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        {categories.length > 0 && (
          <div className="mb-10">
            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-gray-600 font-medium">Filter by:</span>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="px-4 py-1.5 rounded-full text-sm font-medium bg-white border border-amber-200 text-amber-800 hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-colors"
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {posts.length > 0 ? (
          <>
            <p className="text-gray-500 mb-8">{posts.length} {posts.length === 1 ? 'story' : 'stories'} found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🍽️</span>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No stories yet</h2>
            <p className="text-gray-500">Check back soon for delicious content!</p>
          </div>
        )}
      </div>
    </div>
  )
}