// app/posts/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMetafieldValue } from '@/types'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} — Foodies`,
    description: post.metadata?.excerpt || '',
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const tags = getMetafieldValue(post.metadata?.tags)
  const tagList = tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : []
  const publishedDate = post.metadata?.published_date
    ? new Date(post.metadata.published_date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      })

  const author = post.metadata?.author
  const category = post.metadata?.category

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Image */}
      {post.metadata?.featured_image && (
        <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=1400&h=600&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-full object-cover"
            width={1400}
            height={600}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-4xl mx-auto">
              {category && (
                <Link
                  href={`/categories/${category.slug}`}
                  className="inline-block bg-amber-500 text-white text-sm font-semibold px-4 py-1 rounded-full mb-4 hover:bg-amber-600 transition-colors"
                >
                  {category.title}
                </Link>
              )}
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* No image fallback title */}
        {!post.metadata?.featured_image && (
          <div className="mb-8">
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                className="inline-block bg-amber-100 text-amber-800 text-sm font-semibold px-4 py-1 rounded-full mb-4 hover:bg-amber-200 transition-colors"
              >
                {category.title}
              </Link>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>
          </div>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-8 pb-8 border-b border-amber-100">
          {author && (
            <Link href={`/authors/${author.slug}`} className="flex items-center gap-2 hover:text-amber-700 transition-colors">
              {author.metadata?.profile_photo ? (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                  alt={author.title}
                  className="w-8 h-8 rounded-full object-cover"
                  width={48}
                  height={48}
                />
              ) : (
                <span className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold text-xs">
                  {author.title.charAt(0)}
                </span>
              )}
              <span className="font-medium text-gray-700">{author.title}</span>
            </Link>
          )}
          <span>·</span>
          <time dateTime={post.metadata?.published_date || post.created_at}>{publishedDate}</time>
          {tagList.length > 0 && (
            <>
              <span>·</span>
              <div className="flex flex-wrap gap-2">
                {tagList.map((tag) => (
                  <span key={tag} className="tag-badge">{tag}</span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-xl text-gray-600 leading-relaxed font-serif italic mb-8 border-l-4 border-amber-400 pl-4">
            {getMetafieldValue(post.metadata.excerpt)}
          </p>
        )}

        {/* Content */}
        {post.metadata?.content && (
          <div
            className="prose prose-lg prose-amber max-w-none prose-headings:font-bold prose-a:text-amber-700 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.metadata.content }}
          />
        )}

        {/* Author Bio Card */}
        {author && (
          <div className="mt-16 p-6 bg-amber-50 rounded-2xl border border-amber-100">
            <h3 className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-4">About the Author</h3>
            <div className="flex items-start gap-4">
              {author.metadata?.profile_photo ? (
                <img
                  src={`${author.metadata.profile_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
                  alt={author.title}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  width={120}
                  height={120}
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-bold text-xl flex-shrink-0">
                  {author.title.charAt(0)}
                </div>
              )}
              <div className="flex-1">
                <Link href={`/authors/${author.slug}`} className="text-xl font-bold text-gray-900 hover:text-amber-700 transition-colors">
                  {author.title}
                </Link>
                {author.metadata?.location && (
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                    📍 {getMetafieldValue(author.metadata.location)}
                  </p>
                )}
                {author.metadata?.bio && (
                  <p className="text-gray-600 mt-2 leading-relaxed">{getMetafieldValue(author.metadata.bio)}</p>
                )}
                {author.metadata?.website && (
                  <a
                    href={getMetafieldValue(author.metadata.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm text-amber-700 font-semibold hover:underline"
                  >
                    Visit website →
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Back Navigation */}
        <div className="mt-12 flex gap-4">
          <Link
            href="/posts"
            className="text-amber-700 font-semibold hover:text-amber-900 transition-colors flex items-center gap-2"
          >
            ← Back to all posts
          </Link>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="text-amber-700 font-semibold hover:text-amber-900 transition-colors"
            >
              More in {category.title} →
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}