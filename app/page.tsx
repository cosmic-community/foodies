import Link from 'next/link'
import { getAllPosts, getAllAuthors, getAllCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import CategoryCard from '@/components/CategoryCard'
import AuthorCard from '@/components/AuthorCard'
import HeroSection from '@/components/HeroSection'

export default async function HomePage() {
  const [posts, authors, categories] = await Promise.all([
    getAllPosts(),
    getAllAuthors(),
    getAllCategories(),
  ])

  const featuredPosts = posts.slice(0, 6)
  const recentPosts = posts.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <HeroSection featuredPost={posts[0] ?? null} />

      {/* Featured Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Latest Stories</h2>
            <p className="text-gray-500 mt-1">Fresh from the world's kitchens</p>
          </div>
          <Link
            href="/posts"
            className="hidden sm:inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-900 transition-colors"
          >
            View all posts
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {featuredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-6xl mb-4">🍽️</p>
            <p className="text-xl">No posts yet. Check back soon!</p>
          </div>
        )}

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/posts"
            className="inline-block bg-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors"
          >
            View all posts
          </Link>
        </div>
      </section>

      {/* Categories Showcase */}
      {categories.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Explore by Category</h2>
                <p className="text-gray-500 mt-1">Discover cuisines from around the world</p>
              </div>
              <Link
                href="/categories"
                className="hidden sm:inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-900 transition-colors"
              >
                All categories
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.slice(0, 8).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Authors Spotlight */}
      {authors.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Meet Our Foodies</h2>
              <p className="text-gray-500 mt-1">Passionate travelers and culinary explorers</p>
            </div>
            <Link
              href="/authors"
              className="hidden sm:inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-900 transition-colors"
            >
              All authors
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.slice(0, 3).map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-br from-amber-600 to-orange-600 py-16">
        <div className="max-w-3xl mx-auto text-center px-4">
          <span className="text-5xl mb-4 block">🌍</span>
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Culinary Journey
          </h2>
          <p className="text-amber-100 text-lg mb-8">
            Get the latest food travel stories delivered to your inbox. New destinations, hidden gems, and mouthwatering discoveries every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/posts"
              className="bg-white text-amber-700 px-8 py-3 rounded-full font-bold hover:bg-amber-50 transition-colors"
            >
              Explore Stories
            </Link>
            <Link
              href="/authors"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-amber-700 transition-colors"
            >
              Meet the Authors
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}