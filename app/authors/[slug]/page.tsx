// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor, getAllAuthors } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import { getMetafieldValue } from '@/types'

export async function generateStaticParams() {
  const authors = await getAllAuthors()
  return authors.map((author) => ({ slug: author.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)
  if (!author) return { title: 'Author Not Found' }
  return {
    title: `${author.title} — Foodies`,
    description: author.metadata?.bio || `Posts by ${author.title}`,
  }
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) notFound()

  const posts = await getPostsByAuthor(author.id)

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Author Hero */}
      <div className="bg-gradient-to-br from-orange-700 to-amber-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {author.metadata?.profile_photo ? (
            <img
              src={`${author.metadata.profile_photo.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
              alt={author.title}
              className="w-28 h-28 rounded-full object-cover mx-auto mb-6 border-4 border-white shadow-xl"
              width={200}
              height={200}
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold text-4xl mx-auto mb-6 border-4 border-white shadow-xl">
              {author.title.charAt(0)}
            </div>
          )}
          <h1 className="text-4xl font-bold text-white mb-2">{author.title}</h1>
          {author.metadata?.location && (
            <p className="text-amber-200 flex items-center justify-center gap-1 mb-4">
              📍 {getMetafieldValue(author.metadata.location)}
            </p>
          )}
          {author.metadata?.bio && (
            <p className="text-amber-100 text-lg max-w-2xl mx-auto leading-relaxed">
              {getMetafieldValue(author.metadata.bio)}
            </p>
          )}
          {author.metadata?.website && (
            <a
              href={getMetafieldValue(author.metadata.website)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-white text-amber-700 px-6 py-2 rounded-full font-semibold hover:bg-amber-50 transition-colors"
            >
              Visit Website →
            </a>
          )}
        </div>
      </div>

      {/* Author's Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Stories by {author.title}
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
            <span className="text-6xl mb-4 block">📝</span>
            <p className="text-gray-500 text-lg">No stories published yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}